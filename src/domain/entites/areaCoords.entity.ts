import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("area_coords")
export class AreaCoords {
    @PrimaryGeneratedColumn({ name: "area_coords", type: "int"})
    area_coords!: number;
    
    @Column({type: "decimal", precision: 16, scale: 14, default: 0, nullable: false})
    area_coords_lat!: number;

    @Column({type: "decimal", precision: 17, scale: 14, default: 0, nullable: false})
    area_coords_lng!: number;

    @CreateDateColumn({default: Date.now(), nullable: false})
    createdAt!: Date;

    @UpdateDateColumn({default: Date.now(), nullable: false})
    updatedAt!: Date;
 
    @ManyToOne(() => Areas, (area)=>area.area_id)
    area_id?: Areas;
    
}