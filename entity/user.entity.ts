import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "text",
        nullable: true,
    })
    name?: string;

    @Column({
        type: "text",
        nullable: true,
    })
    email?: string;

    @Column({
        type: "text",
        nullable: false,
        select: false,
    })
    password!: string;

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
}
