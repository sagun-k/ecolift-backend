// UserDto.js

class UserDto {
    constructor(user) {
        this.email = user.email;
        this.token = user.token;
        this.role = user.role;
        this.name = user.name;
        this.createdAt = user.createdAt;
        this.lastLoginAt = user.lastLoginAt;
        this.isActive = user.isActive;
        this.phone = user.phone;
        this.profilepicture = user.profilepicture;
    }

    // Method to return only necessary fields for user response
    static toResponseDto(user) {
        return new UserDto(user);
    }
}

export  default UserDto;
