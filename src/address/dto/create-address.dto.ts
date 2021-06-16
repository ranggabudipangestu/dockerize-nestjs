import { User } from "src/users/entities/user.entity";

export class CreateAddressDto {
    user_id:User

    address:string

    city:string
}
