class UserDto{
    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.password = row.password;
        this.address = row.address;
        this.description = row.description;
    }
}

module.exports = UserDto;
