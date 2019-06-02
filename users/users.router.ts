import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {User} from './users.model'
import { Model } from 'mongoose';


class UsersRouter extends ModelRouter<User> {
  
  
  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.senha = undefined
      //delete document.password
    })
  }
  
  applyRoutes(application: restify.Server){

    application.get('/users', this.findAll)
    application.get('/users/:id', [this.validateId,this.findById])
    application.post('/users', this.save)
    application.put('/users/:id', [this.validateId,this.replace])
    application.patch('/users/:id', this.update)
    application.del('/users/:id', this.delete)

  }
}
export const usersRouter = new UsersRouter()

/*
get > url do recurso > se existir parametro, manda por parâmetro na url
/users/:id pegando um item individual

post > mudança de algo no servidor > já aceita um conteúdo no corpo, é permitido fazer modificações no servidor


*/