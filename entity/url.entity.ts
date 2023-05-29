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

@Entity("urls")
export class Url {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    long_url!: string;

    @Column()
    short_url!: string;

    @Column()
    url_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
