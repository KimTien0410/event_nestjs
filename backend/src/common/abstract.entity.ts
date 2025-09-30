import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import type { Uuid } from './types';


export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;
}
