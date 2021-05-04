class PetDto{
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.breed = row.breed;
        this.weight = row.weight;
        this.age = row.age;
        this.description = row.description;
        this.picture = row.picture;
        this.userId = row.user_id;
    }
}

module.exports = PetDto;
