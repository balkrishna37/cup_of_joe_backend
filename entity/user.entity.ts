import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Token } from "./token.entity";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "text",
        nullable: false,
    })
    name!: string;

    @Column({
        type: "text",
        nullable: false,
    })
    email!: string;

    @Column({
        type: "text",
        nullable: false,
        select: false,
    })
    password!: string;

    @Column({
        default: false
    })
    is_admin!: boolean;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    created_at?: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    updated_at?: Date;

    @OneToMany(() => Token, (token) => token.user_id)
    tokens!: Token;
}
