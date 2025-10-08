import { AbstractEntity } from '../database';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractEntity<User> {
    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, { cascade: true })
    @JoinTable()
    roles?: Role[];

    constructor(entity?: { email: string; password: string; roles?: Role[] }) {
            super(entity);
     
        if (entity) {
            this.email = entity.email
            this.password = entity.password
            this.roles= entity.roles
        }
    }

}