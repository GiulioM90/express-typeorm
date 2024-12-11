 import { AppDataSource } from "../data-source"   
 import { User } from "../entity/User"
 import { Question } from "../entity/Question"

 export const testCreateData = async () =>{

   //insert new users for test
   await AppDataSource.manager.save(
       AppDataSource.manager.create(User, {
           firstName: "Timber",
           lastName: "Saw",
           age: 27
       })
   )

   await AppDataSource.manager.save(
       AppDataSource.manager.create(User, {
           firstName: "Phantom",
           lastName: "Assassin",
           age: 24
       })
   )

   //insert new Question for test
   await AppDataSource.manager.save(
       AppDataSource.manager.create(Question, {
           name: "Test name",
       })
   )
 }
