import { 
    Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn,UpdateDateColumn, VersionColumn,
    DeleteDateColumn, ManyToMany, JoinTable
} from "typeorm"
import { User } from "./User"

@Entity("question")
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @CreateDateColumn()
    created_at: string
    
    @UpdateDateColumn()
    updated_at: string

    @VersionColumn()

    @DeleteDateColumn()
    deleted_at: string

    @ManyToMany(() => User, user => user.questions)

    @JoinTable({
      name: 'users_questions',
      joinColumn: { name: 'question_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })

    users: User[];
}
