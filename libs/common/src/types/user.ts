export interface User {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
}

export interface FindOneUserResponse extends User {}
