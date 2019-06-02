"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.on('beforeRender', document => {
            document.senha = undefined;
            //delete document.password
        });
    }
    applyRoutes(application) {
        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateId, this.replace]);
        application.patch('/users/:id', this.update);
        application.del('/users/:id', this.delete);
    }
}
exports.usersRouter = new UsersRouter();
/*
get > url do recurso > se existir parametro, manda por parâmetro na url
/users/:id pegando um item individual

post > mudança de algo no servidor > já aceita um conteúdo no corpo, é permitido fazer modificações no servidor


*/ 
