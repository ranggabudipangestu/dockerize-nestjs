
import { Address } from "src/address/entities/address.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryColumn({type:"uuid", nullable:false})
    id:string

    @Index({unique:true})
    @Column({type:"varchar", length:100, nullable:false})
    username:string

    @Column({type:"varchar", length:250})
    password:string

    @Index({unique:true})
    @Column({type:"varchar", length:250, nullable:false})
    email:string

    @Column({type:"varchar", length:250})
    name:string

    @CreateDateColumn({type:"timestamp"})
    createdAt:string

    @BeforeInsert()
    async createdDate():Promise<void>{
        this.createdAt = (new Date()).toISOString();
    }

    @UpdateDateColumn({type:"timestamp"})
    updatedAt:string

    @BeforeUpdate()
    async updatedDate():Promise<void>{
        this.updatedAt = (new Date()).toISOString();
    }

    @OneToMany(()=> Address, address => address.user_id, {cascade:true})
    address:Address[]


}
