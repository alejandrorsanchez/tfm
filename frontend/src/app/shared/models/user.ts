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

  copyProperties(item){
    this.id = item.id;
    this.username = item.username;
    this.password = item.password;
    this.email = item.email;
    this.description = item.description;
    this.address = item.address;
  }
}
