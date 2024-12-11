import { UserController } from "./controller/UserController"
import { QuestionController } from "./controller/QuestionController"

export const Routes = [
// USER
{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
 // QuestionController
{
    method: "get",
    route: "/questions",
    controller: QuestionController,
    action: "all"
}, {
    method: "get",
    route: "/questions/:id",
    controller: QuestionController,
    action: "one"
}, {
    method: "post",
    route: "/questions",
    controller: QuestionController,
    action: "save"
}, {
    method: "delete",
    route: "/questions/:id",
    controller: QuestionController,
    action: "remove"
}
]