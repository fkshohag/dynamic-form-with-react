export const formConfig = [
      {
            "type": "short-text",
            "id": 1,
            "required": true,
            "name": "First Name"
      },
      {
            "type": "short-text",
            "id": 2,
            "name": "Last Name"
      },
      {
            "type": "date",
            "id": 3,
            "name": "Date of Birth"
      },
      {
            "type": "email",
            "id": 4,
            "name": "Email",
            "required": true,
            "description": "The customers primary contact email address"
      },
      {
            "type": "long-text",
            "id": 5,
            "name": "Address",
            "description": "The customers current residential address"
      },
      {
            "type": "phone-number",
            "id": 6,
            "name": "Contact Number"
      },
      {
            "type": "dropdown",
            "id": 7,
            "name": "Gender",
            "options": ["Female", "Male", "Other"]
      },
      {
            "type": "multi-select",
            "id": 8,
            "name": "Areas of Recommendation",
            "description": "Select all of the areas that you are providing a recommendation for",
            "options": [
                  "Insurance",
                  "Superannuation",
                  "Investments",
                  "Cashflow",
                  "Pension",
                  "Estate Planning"
            ]
      }
]