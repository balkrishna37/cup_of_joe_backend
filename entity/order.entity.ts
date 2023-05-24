import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    item_id!: string;

    @Column()
    ordered_by!: number;

    @Column()
    quantity!: number;

    @Column({ nullable: true })
    description?: string;

    @Column({
        default: 'pending',
    })
    status!: string;

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

    // @ManyToOne(() => Customer, (customer) => customer.customerData)
    // @JoinColumn({ name: "customer_id" })
    // customer!: Customer;
}
