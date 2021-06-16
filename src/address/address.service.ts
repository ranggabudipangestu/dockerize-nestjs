import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) private addressRepository:Repository<Address>){}
  async create(createAddressDto: CreateAddressDto):Promise<any> {
    const {user_id, address, city} = createAddressDto
    const sqlCommand = this.addressRepository.createQueryBuilder()
    .insert()
    .into(Address)
    .values({id:uuid(), user_id, address, city})
    try{
      const result = sqlCommand.execute()
      return result
    }catch(err){
      throw new HttpException(err, 400)
    }
  }

  async findAll(user_id:string):Promise<any> {
    try{
      let sqlCommand = this.addressRepository.createQueryBuilder("address")
      .leftJoinAndSelect("user", 'user', "address.user_id = user.id")
      .where("address.user_id = :user_id",{user_id})
      
      const result = await sqlCommand.getRawMany()

      if(!result.length){
        throw new HttpException("Address data not found", 404)
      }

      const addressData = result.map(data => {
        return {
          id:data.address_id,
          address:data.address_address,
          city:data.address_city,
          username : data.user_username,
          createdAt:data.address_createdAt,
          updatedAt:data.address_updatedAt
        }
      })
      return addressData
    }catch(err){
      throw new HttpException(err, 400)
    }
    
  }

  findOne(id: string) {
    return this.addressRepository.findOne(id);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: string) {
    return `This action removes a #${id} address`;
  }
}
