"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
const auth_handler_1 = require("../security/auth.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.senha = undefined;
            //delete document.password
        });
    }
    // o User sempre retorna um array, por isso é necesserário que o findByEmail retorne um arrays
    applyRoutes(application) {
        application.get({ path: `${this.basePath}`, version: '2.0.0' }, [this.findByEmail, this.findAll]);
        application.get({ path: `${this.basePath}`, version: '1.0.0' }, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, this.update);
        application.del(`${this.basePath}/:id`, this.delete);
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
/*
get > url do recurso > se existir parametro, manda por parâmetro na url
/users/:id pegando um item individual

post > mudança de algo no servidor > já aceita um conteúdo no corpo, é permitido fazer modificações no servidor


*/ 
