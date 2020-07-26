import React from 'react';
import { formConfig } from '../../database/formConfig';
import { FormType } from '../../enums/FormType';
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize, Paper, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useStyles } from './Style';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { FieldManger } from '../../manager/FieldManager';
import { CSVLink } from "react-csv";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = useStyles;

export interface Props {
  classes?: any
}

export interface State {
  form: any,
  selectedDate: any,
  area: any,
  initalHeplperText: string,
  formValues: any,
  data: any,
  progress: number,
  submitEnable: boolean
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class DynamicForm extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      form: formConfig,
      area: ['None'],
      initalHeplperText: '',
      selectedDate: new Date(),
      formValues: [{}],
      data: [{}],
      progress: 0,
      submitEnable: false
    }
    this.selectedValueRender = this.selectedValueRender.bind(this)
  }

  getTableHeaderList(): any {
    let form = this.state.form
    let columnList: any = [{}]
    form.forEach((element: any) => {
      columnList.push(element.name)
    });
    return columnList
  }

  handleChange(idx: number): any {
    return (event: any) => {
      const { name, value } = event.target;
      const formValues = [...this.state.formValues];
      let fieldType = this.state.form[idx - 1].type;
      let isError: boolean = false;
      let error: string = this.state.initalHeplperText;

      if (this.state.form[idx - 1]['required'] !== undefined && !value) {
        error = this.state.form[idx - 1].name + " is required!";
        isError = true;
      }

      if (fieldType === FormType.EMAIL) {
        error = FieldManger.emailValidation(value)
        isError = true;
      }

      formValues[idx] = {
        [name]: value,
        error: error
      };
      this.setState({ formValues });
      this.setState({ progress: 10 + 1 })

      // progressbar
      let formData = this.state.formValues

      let perElementMark: number = 0;
      let mark: number = 0;
      let elementLength: number = this.state.form.length
      if (elementLength > 0) {
        perElementMark = 100 / (elementLength - 1)
      }
      if (formData.length > 0) {
        formData.forEach((element: any, index: any) => {
          if (index > 1 && element !== undefined) {
            mark += perElementMark;
          }
        });
      }
      this.setState({ progress: mark })

      // Checking full form submited or not
      if (formData.length === this.state.form.length || formData.length - 1 === this.state.form.length) {
        formData.forEach((element: any, index: number) => {
          if (element !== undefined && element.error !== undefined && element.error.length > 0) {
            isError = true;
          }
        });
        if (!isError) {
          this.setState({ submitEnable: true })
        } else {
          this.setState({ submitEnable: false })
        }
      }
    }
  }

  // This method will generate short input field
  shortInput(item: any): any {
    let fieldName = FieldManger.getFieldName(item.name);
    return <Tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <TextField
        required={item.required !== undefined ? item.required : false}
        error={false}
        id={item.id + '_' + fieldName}
        label={item.name}
        name={fieldName}
        helperText={this.state.formValues[item.id] !== undefined ?
          this.state.formValues[item.id]['error'] : this.state.initalHeplperText}
        onChange={this.handleChange(item.id)}
      />
    </Tooltip>
  }

  // This method will generate long input field 
  longInput(item: any): any {
    let fieldName = FieldManger.getFieldName(item.name);
    return <Tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <TextareaAutosize
        required={item.required !== undefined ? item.required : false}
        aria-label="minimum height"
        rowsMin={3}
        id={item.id + '_' + fieldName}
        name={fieldName}
        placeholder={item.name}
        onChange={this.handleChange(item.id)}
      />
    </Tooltip>
  }

  // Email input generator
  emailInput(item: any): any {
    let fieldName = FieldManger.getFieldName(item.name);
    return <Tooltip
      // Checking if description have or not ? if have then it should be show on tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <TextField
        required={item.required !== undefined ? item.required : false}
        error={false}
        id={item.id + '_' + fieldName}
        label={item.name}
        name={fieldName}
        helperText={this.state.formValues[item.id] !== undefined ?
          this.state.formValues[item.id]['error'] : this.state.initalHeplperText}
        onChange={this.handleChange(item.id)}
      />
    </Tooltip>
  }

  /* Checking user input value is number or text
     phone number only allow number
  */
  onHandleTelephoneChange(idx: number): any {
    return (event: any) => {
      let telephone = event.target.value;
      if (!Number(telephone)) {
        event.target.value = ''
      } else {
        const { name, value } = event.target;
        const formValues = [...this.state.formValues];
        formValues[idx] = { [name]: value };
        this.setState({ formValues });
      }
    }
  };

  phoneNumberInput(item: any): any {
    let fieldName = FieldManger.getFieldName(item.name);
    return <Tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <TextField
        required={item.required !== undefined ? item.required : false}
        type="tel"
        id={item.id + '_' + fieldName}
        label={item.name}
        name={fieldName}
        helperText={this.state.formValues[item.id] !== undefined ?
          this.state.formValues[item.id]['error'] : this.state.initalHeplperText}
        onChange={this.onHandleTelephoneChange(item.id)}
      />
    </Tooltip>
  }

  // Dropdown menu generating
  dropDownField(item: any): any {
    let fieldName = FieldManger.getFieldName(item.name);
    const { classes } = this.props
    return <Tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <FormControl className={classes.dropDownControl}>
        <InputLabel id="demo-controlled-open-select-label">{item.name}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id={item.id + '_' + fieldName}
          name={fieldName}
          onChange={this.handleChange(item.id)}
        >
          {item.options.map((name: any) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  }

  selectedValueRender(selected: any): any {
    return selected
  }

  multiDropDownField(item: any): any {
    const { classes } = this.props
    let fieldName = FieldManger.getFieldName(item.name);
    return <Tooltip
      title={item.description !== undefined ? item.description : ''}
      placement="top"
    >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{item.name}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id={item.id + '_' + fieldName}
          multiple
          value={this.state.formValues[item.id] !== undefined ? this.state.formValues[item.id][fieldName] : ['']}
          onChange={this.handleChange(item.id)}
          input={<Input />}
          name={fieldName}
          renderValue={this.selectedValueRender}
          MenuProps={MenuProps}
        >
          {item.options.map((name: any) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={item.name.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  }

  datePicker(item: any): any {
    const { classes } = this.props;
    let fieldName = FieldManger.getFieldName(item.name);

    return <TextField
      id={item.id + '_' + fieldName}
      label={item.name}
      type="date"
      name={fieldName}
      defaultValue={new Date()}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={this.handleChange(item.id)}
    />

  }

  // Form generator will take an item and make corresponding form field
  generateForm(item: any): any {
    switch (item.type) {
      case FormType.SHORTTEXT:
        return this.shortInput(item)
      case FormType.LONGTEXT:
        return this.longInput(item)
      case FormType.EMAIL:
        return this.emailInput(item)
      case FormType.DATE:
        return this.datePicker(item)
      case FormType.DROPDOWN:
        return this.dropDownField(item)
      case FormType.MULTISELECT:
        return this.multiDropDownField(item)
      case FormType.PHONE:
        return this.phoneNumberInput(item)
    }
  }

  csvFileReady(): boolean {
    let headers = this.getTableHeaderList()
    let tableDate = []
    tableDate.push(headers.slice(1, headers.length))
    let formData = this.state.formValues
    let _fieldValues: any = {}

    if (formData.length > 1) {
      formData.forEach((element: any, index: any) => {
        if (index > 0 && element !== undefined) {
          let keyAndValue = element
          delete keyAndValue['error']
          _fieldValues = { ..._fieldValues, ...keyAndValue }
        }
      });
    }
    this.setState({ data: [_fieldValues] })
    return true
  };

  formSubmit(event: any): boolean {
    if (this.csvFileReady()) {
      return true
    }
    return false
  }

  CircularProgressWithLabel(value: number): any {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }


  render() {
    const { classes } = this.props;
    const progressBar = this.CircularProgressWithLabel(this.state.progress)
    return <div className={classes.root}>
      {progressBar}
      <form className={classes.form} noValidate>
        <Paper className={classes.formPaper}>
          {this.state.form.map((item: any) => {
            return <div> {this.generateForm(item)} </div>
          })}
          <CSVLink
            filename={"submission.csv"}
            data={this.state.data}
            target="_blank"
            onClick={this.formSubmit.bind(this)}
          >
            {this.state.submitEnable ? 'Submit' : ''}
          </CSVLink>
        </Paper>
      </form>
    </div>
  }
}

export default withStyles(styles)(DynamicForm);
