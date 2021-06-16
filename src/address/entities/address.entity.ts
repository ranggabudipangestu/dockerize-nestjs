import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryColumn({type:"uuid"})
    id:string

    @ManyToOne(() => User, user => user.id, {onDelete:"SET NULL", onUpdate:"CASCADE"})
    @JoinColumn({name:"user_id"})
    user_id:User

    @Column()
    address:string

    @Column()
    city:string

    @CreateDateColumn({type:"timestamp"})
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string

    
    // @BeforeInsert()
    // createdDate() {
    //     this.createdAt = (new Date()).toISOString();
    // }


    // @BeforeUpdate()
    // updatedDate() {
    //     this.updatedAt = (new Date()).toISOString();
    // }

}
