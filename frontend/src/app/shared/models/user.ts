export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  description: string;
  address: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.description = '';
    this.address = '';
  }

}
