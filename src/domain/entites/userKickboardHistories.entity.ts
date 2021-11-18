import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_kickboard_histories")
export class UserKickboardHistories {
    @PrimaryGeneratedColumn({ name: "user_history_id"})
    userHistoryId: number;

    @Column({ name: "user_id", type: "int", nullable: false })
    userId: number;

    @Column({ name: "deer_id", type: "int", nullable: false })
    deerId: number;

    @Column({ name: "area_id", type: "int", nullable: false })
    areaId: number;

    @Column({ name: "user_end_lat", type: "decimal", precision: 16, scale: 14, default: 0, nullable: false })
    userEndLat: number;

    @Column({ name: "user_end_lng", type: "decimal", precision: 17, scale: 14, default: 0, nullable: false })
    userEndLng: number;

    @Column({ name: "pay", type: "decimal", precision: 20, scale: 2, default: 0, nullable: false })
    pay: number;

    @Column({ name: "discount_id", type: "varchar", length: 40, nullable: true })
    discountId: string;

    @Column({ name: "penalty_id", type: "varchar", length: 40, nullable: true })
    penaltyId: string;

    @Column({ name: "exception_id", type: "varchar", length: 40, nullable: true })
    exceptionId: string;

    @Column({ name: "use_start_at", type: "date", nullable: false })
    useStartAt: Date;

    @Column({ name: "use_end_at", type: "date", nullable: false })
    useEndAt: Date;
}