export interface User {
  _id?: string,
  username: string;
  firstname: string;
  lastname: string;
  address: {
    street: string,
    streetNum: string,
    city: string,
    tk: string
  },
  email: string,
  mobile: string,
  password: string
}