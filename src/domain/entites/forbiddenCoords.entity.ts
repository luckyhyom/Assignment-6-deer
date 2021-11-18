import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForbiddenAreaZones } from "./forbiddenAreaZones.entity";

@Entity("forbidden_coords")
export class ForbiddenCoords {
    @PrimaryGeneratedColumn({ name: "forbidden_coords_id", type: "int"})
    forbidden_coords_id!: number;
    
    @Column({type: "decimal", precision: 20, scale: 2, default: 0, nullable: false})
    forbidden_coords_lat!: number;

    @Column({type: "decimal", precision: 20, scale: 2, default: 0, nullable: false})
    forbidden_coords_lng!: number;

    @CreateDateColumn({default: Date.now(), nullable: false})
    createdAt!: Date;

    @UpdateDateColumn({default: Date.now(), nullable: false})
    updatedAt!: Date;
 
    @ManyToOne(() => ForbiddenAreaZones, (forbiddenAreaZones) => forbiddenAreaZones.forbidden_area_id)
    forbidden_area_id?: ForbiddenAreaZones;
    
}
