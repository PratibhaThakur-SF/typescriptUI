 HTML page showing a list of users in a tabular format. The data should be populated from a JSON stored in code. By default, the page should open with just a button saying 'Load data'. Clicking on that button should show the data. After that, the button should change to 'Refresh data'. The columns needed in UI are - First name, Middle name, Last name, email, phone number, role, address. Last column should have 2 buttons saying 'Edit' and 'Delete'. Clicking on Edit should make the row editable, with Save and Cancel button at last column. Save click should keep the changes in UI. cancel should revert it back. Delete should just remove the row from UI. Refresh data should just reload the data again. Define a model class for User entry. Define enum for roles. Define interface for CRUD actions and use it accordingly.