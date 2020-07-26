export class FieldManger {
      static removeSpace(str: string): string {
            return str.split(' ').join('');
      }
      /**
       * Take a field and return corresponding field name 
       * @param field 
       * @returns fieldName
       */
      public static getFieldName(field: string): string {
            return FieldManger.removeSpace(field)
      }

      public static emailValidation(email: string): string {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase()) ? '': 'Please enter valid email!';
      }
}