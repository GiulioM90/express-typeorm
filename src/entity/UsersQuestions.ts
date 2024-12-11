import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Question } from './Question';

@Entity('users_questions')
class UsersQuestions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  question_id: string;

  @ManyToMany(() => User, user => user.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Question, question => question.users)
  @JoinColumn({ name: 'question_id' })
  customer: Question;
}

export default UsersQuestions;