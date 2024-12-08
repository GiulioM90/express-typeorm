import { 
    Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn,UpdateDateColumn, VersionColumn,
    DeleteDateColumn
} from "typeorm"

@Entity("my_users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @CreateDateColumn()
    createdAt: string
    
    @UpdateDateColumn()
    updatedAt: string

    @VersionColumn()

    @DeleteDateColumn()
    deletedAt: string
}
