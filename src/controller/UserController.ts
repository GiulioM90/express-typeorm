import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { Question } from "../entity/Question"
import { In } from "typeorm"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.userRepository.find();
            response.json(users); // Rispondi esplicitamente
        } catch (error) {
            next(error); // Passa eventuali errori al middleware di gestione degli errori
        }
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const user = await this.userRepository.findOne({ where: { id } });
    
            if (!user) {
                return response.status(404).send("Unregistered user");
            }
            response.json(user);
        } catch (error) {
            next(error);
        }
    }
    
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { firstName, lastName, age, questions } = request.body;

            // Recupera gli utenti dal database utilizzando gli ID forniti
            const questionRepository = AppDataSource.getRepository(Question);
            const questionEntities = await questionRepository.findBy({ id: In(questions) });
    
            if (questionEntities.length === 0) {
                return response.status(400).json({ error: "Invalid question IDs provided" });
            }
    
            // Crea la domanda e assegna le relazioni
            const question = Object.assign(new Question(), {  firstName, lastName, age, questions: questionEntities });
            const savedQuestion = await this.userRepository.save(question);
    
            response.status(201).json(savedQuestion); // Risposta 201 Created
        } catch (error) {
            next(error);
        }
    }
    
    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const userToRemove = await this.userRepository.findOneBy({ id });
    
            if (!userToRemove) {
                return response.status(404).send("This user does not exist");
            }
    
            await this.userRepository.remove(userToRemove);
            response.send("User has been removed");
        } catch (error) {
            next(error);
        }
    }
    

}