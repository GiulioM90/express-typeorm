import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Question } from "../entity/Question"

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
            const { name } = request.body;
            const question = Object.assign(new Question(), { name });
            console.log(question)
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