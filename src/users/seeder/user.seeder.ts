import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as bcrypt from "bcryptjs";



@Injectable()
export class UserSeed {
constructor(
    private readonly userService: UsersService,
) { }

@Command({ command: 'create:user', describe: 'create a user', autoExit: true })
async create() {
    const user = await this.userService.create({
        username:"rangga2",
        password: "BackEndRangga",
        email:"ranggabp2@gmail.com",
        name:"rangga2",
    });
}
}