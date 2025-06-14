import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

export enum CookieStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LIMIT = 'limit',
    DIE = 'die',
}

@Entity('cookie')
export class CookieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    cookie: string;

    @Column({ name: 'created_by' })
    createdBy: number;

    @Column({ name: 'token', type: 'varchar', length: 255 })
    token: string;

    @Column({ type: 'enum', enum: CookieStatus, default: CookieStatus.ACTIVE })
    status: CookieStatus;

    @ManyToOne(() => UserEntity, (user) => user.links)
    @JoinColumn({ name: 'created_by' })
    user: UserEntity;
}