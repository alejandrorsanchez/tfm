export class Add {
  id: number;
  userId: string;
  petId?: number;

  constructor(userId: string, petId?: number) {
    this.userId = userId;
    this.petId = petId ? petId : undefined;
  }
}
