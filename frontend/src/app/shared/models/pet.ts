export class Pet {
  id: number;
  name: string;
  breed: string;
  weight?: number;
  age: number;
  description: string;
  userId: string;
  picture?: string;

  constructor() {
    this.name = '';
    this.breed = '';
    this.description = '';
  }

  copyProperties(item){
    this.id = item.id;
    this.name = item.name;
    this.breed = item.breed;
    this.weight = item.weight;
    this.age = item.age;
    this.description = item.description;
    this.userId = item.userId;
    this.picture = item.picture;
  }
}
