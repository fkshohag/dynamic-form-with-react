# Assignment

This project is used React, typescript and matarial ui design.


## Installation

### `npm install`
For npm package install purpose 

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `Project structure`

1. All component is stored in components folder
2. A generic routing table will generate route list which stored in `AppRouting.module.tsx` file
3. Shared folder will store shareable component.
4. Manager folder store all Service manager related file.
5. All enums stored in enum folder
6. Feature folder store every module feature
7. Store is using for redux state management purpose.
8. Core folder is representing utility functionality.

### `Progress bar`
In the top of the page I have added a progress bar. this progress bar will update according to form value update.


## Tooltip 
Tooltip messsage will be show according to field description value.

# `Database.json.txt`
Database json file stored in database folder, so if you want to add any other  field then please add ``formConfig.txs`` file.

I have added required attribute so if you want to set any field as a required than can easily do it by below example.
 

```
{
      "type": "email",
      "id": 4,
      "name": "Email",
      "required": true,
      "description": "The customers primary contact email address"
},
```

### Csv file download

After fillup form value press the submit button it will generate a submission.csv file for you.




