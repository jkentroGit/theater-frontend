export interface User {
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