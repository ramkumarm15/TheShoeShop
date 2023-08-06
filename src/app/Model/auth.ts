export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  accessToken: string;
  username: string;
}

export interface Register {
  username: string;
  password: string;
  name: string;
  city: string;
  emailAddress: string;
  about: string;
}
