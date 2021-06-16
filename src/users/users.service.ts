import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from "uuid";
import { User } from './entities/user.entity';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  async create(createUserDto: CreateUserDto):Promise<any>{
    
    let {username, password, email, name} = createUserDto
    const id = uuid();
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt)
    const insertCommand = this.userRepository.createQueryBuilder()
      .insert()
      .into(User)
      .values({id, username, password, email, name})

    try{
      const result = await insertCommand.execute()
      return result.identifiers

    }catch(err){
      throw new HttpException(err.detail, 400)
    }
  }

  async findAll() {
    try{
      let sqlCommand = this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.address", "address")
      
      const result = await sqlCommand.getMany()

      if(!result.length){
        throw new HttpException("User data not found", 404)
      }

      const userData = result.map(data => {
        return {
          id:data.id,
          username:data.username,
          name:data.name,
          addresses:data.address.map(dataAddress=>{
            return {
              address:dataAddress.address,
              city:dataAddress.city
            }
          }),
          createdAt:data.createdAt,
          updatedAt:data.updatedAt,
        }
      })
      return userData
    }catch(err){
      throw new HttpException(err, 400)
    }
    
  }

  async findOne(id: string) {
    const userData = await this.userRepository.findOne({id})
    return userData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
