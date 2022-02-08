import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export enum DeviceType {
    CAMERA = 'CAMERA',
    SENSOR = 'SENSOR',
    REMOTE_CONTROL = 'REMOTE_CONTROL',
}

@Entity()
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column()
    serial?: string;

    @Column({ length: 12 })
    mac_address?: string;

    @Column({ type: 'enum', enum: DeviceType })
    type?: DeviceType;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}
