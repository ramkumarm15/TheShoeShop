import { BillingAddress } from './billing-address';

export interface User {
  id: number;
  username: string;
  name: string;
  emailAddress: string;
  about: string;
  city: string;
  gender: string;
  age: number;
  mobileNumber: number;
  billingAddresses: BillingAddress[];
}

export interface UserResponse {
  status: number;
  message: string;
}

const user: User = {
  id: 1,
  username: 'test',
  name: 'test',
  emailAddress: 'test',
  about: 'test',
  city: 'test',
  gender: 'test',
  age: 123,
  mobileNumber: 123,
  billingAddresses: [
    {
      id: 1,
      billingName: 'test',
      address1: 'test',
      address2: 'test',
      city: 'test',
      state: 'test',
      mobileNumber: 123456789,
      postalCode: 123456,
      default: false,
    },
  ],
};
