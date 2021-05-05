import {User} from "./user";
import {Pet} from "./pet";

export class AddListing {
  user: User;
  pet?: Pet;
  distance?: number;

  constructor() {
    this.user = new User();
    this.pet = new Pet();
  }
}
