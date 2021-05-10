export class User {
  id: number;
  username: string;
  password: string;
  description: string;
  address: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.description = '';
    this.address = '';
  }

  copyProperties(item){
    this.id = item.id;
    this.username = item.username;
    this.password = item.password;
    this.description = item.description;
    this.address = item.address;
  }
}
