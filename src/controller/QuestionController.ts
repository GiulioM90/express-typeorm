import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Question } from "../entity/Question"
import { User } from "../entity/User"
import { In } from "typeorm"

export class QuestionController {

    private questionRepository = AppDataSource.getRepository(Question)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const questions = await this.questionRepository.find();
            response.json(questions); // Rispondi esplicitamente
        } catch (error) {
            next(error); // Passa eventuali errori al middleware di gestione degli errori
        }
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const question = await this.questionRepository.findOne({ where: { id } });
    
            if (!question) {
                return response.status(404).send("Question not found");
            }
            response.json(question);
        } catch (error) {
            next(error);
        }
    }
    
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, users } = request.body;
    
            // Recupera gli utenti dal database utilizzando gli ID forniti
            const userRepository = AppDataSource.getRepository(User);
            const userEntities = await userRepository.findBy({ id: In(users) });
    
            if (userEntities.length === 0) {
                return response.status(400).json({ error: "Invalid user IDs provided" });
            }
    
            // Crea la domanda e assegna le relazioni
            const question = Object.assign(new Question(), { name, users: userEntities });
            const savedQuestion = await this.questionRepository.save(question);
    
            response.status(201).json(savedQuestion); // Risposta 201 Created
        } catch (error) {
            next(error);
        }
    }    
    
    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const questionToRemove = await this.questionRepository.findOneBy({ id });
    
            if (!questionToRemove) {
                return response.status(404).send("This question does not exist");
            }
    
            await this.questionRepository.remove(questionToRemove);
            response.send("Post has been removed");
        } catch (error) {
            next(error);
        }
    }
    

}