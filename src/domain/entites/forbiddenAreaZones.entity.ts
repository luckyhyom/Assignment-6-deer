import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("forbidden_area_zones")
export class ForbiddenAreaZones {
    @PrimaryGeneratedColumn({ name: "forbidden_area_id", type: "int"})
    forbidden_area_id!: number;
    
    @Column({name: "forbidden_area_boundary", type: "polygon", nullable: false})
    forbidden_area_boundary!: number;

    @CreateDateColumn({default: Date.now(), nullable: false})
    createdAt!: Date;

    @UpdateDateColumn({default: Date.now(), nullable: false})
    updatedAt!: Date;
 
    @ManyToOne(()=> Areas, (area)=>area.area_id)
    area_id?: Areas;
}