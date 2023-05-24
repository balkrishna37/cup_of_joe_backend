import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("tokens")
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: string;

    @Column()
    token!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.tokens)
    @JoinColumn({ name: "user_id" })
    user!: User;
}
