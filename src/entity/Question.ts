import { 
    Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn,UpdateDateColumn, VersionColumn,
    DeleteDateColumn
} from "typeorm"

@Entity("question")
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: string
    
    @UpdateDateColumn()
    updated_at: string

    @VersionColumn()

    @DeleteDateColumn()
    deleted_at: string
}
