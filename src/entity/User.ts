import { 
    Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn,UpdateDateColumn, VersionColumn,
    DeleteDateColumn, ManyToMany, JoinTable
} from "typeorm"
import { Question } from "./Question"

@Entity("my_users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToMany(() => Question, question => question.users, { eager: true })

    @JoinTable({
      name: 'users_questions',
      joinColumn: { name: 'user_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'question_id', referencedColumnName: 'id' }
    })
    questions: Question[];
}
