import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("parking_zones")
export class ParkingZones {
    @PrimaryGeneratedColumn({ name: "parkingzone_id", type: "int" })
    userHistoryId: number;

    @Column({ name: "area_id", type: "int", nullable: false })
    areaId: number;

    @Column({ name: "parkingzone_center_lat", type: "decimal", precision: 16, scale: 14, default: 0, nullable: false })
    parkingzoneCenterLat: number;

    @Column({ name: "parkingzone_center_lng", type: "decimal", precision: 17, scale: 14, default: 0, nullable: false })
    parkingzoneCenterLng: number;

    @Column({ name: "parkingzone_radius", type: "decimal", precision: 17, scale: 14, default: 0, nullable: false })
    parkingzoneRadius: number;

    @CreateDateColumn({ name: "created_at", type: "date", default: Date.now(), nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "date", default: Date.now(), nullable: false })
    updatedAt: Date;
}