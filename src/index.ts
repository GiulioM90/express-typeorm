import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
// import { testCreateData } from "./utils/testCreate"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    
    app.use((err: Error, req: Request, res: Response, next: Function) => {
        console.error(err.stack);
        res.status(500).json({ message: "Internal server error" });
    });
    
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(8080)
    // testCreateData() // for testing create after first migrations 
    console.log("Express server has started on port 8080. Open http://localhost:8080/users to see results")

}).catch(error => console.log(error))
