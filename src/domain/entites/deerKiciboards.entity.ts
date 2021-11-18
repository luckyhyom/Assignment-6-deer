import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("deer_kiciboards")
export class deerKiciboards {
    @PrimaryGeneratedColumn({ name: "deer_id", type: "int" })
    deerId: number;

    @Column({ name: "area_id", type: "int", nullable: false })
    areaId: number;

    @Column({ name: "deer_name", type: "char", length: 50, nullable: true })
    deerName: string;

    @CreateDateColumn({ name: "created_at", type: "date", default: Date.now(), nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "date", default: Date.now(), nullable: false })
    updatedAt: Date;
}