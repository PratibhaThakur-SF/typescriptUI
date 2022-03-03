import { Roles } from "./Role";
export class UserModel {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  role: Roles;
  address: string;

  constructor(
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    role: Roles,
    address: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.address = address;
  }
}

