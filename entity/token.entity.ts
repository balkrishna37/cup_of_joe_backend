import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

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
}
