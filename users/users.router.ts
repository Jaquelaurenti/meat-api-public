import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {User} from './users.model'
import { Model } from 'mongoose';
import { authenticate } from '../security/auth.handler';
import {authorize} from '../security/authz.handler'



class UsersRouter extends ModelRouter<User> {
   
  constructor(){
    super(User)
    this.on('beforeRender', document=>{
      document.senha = undefined
      //delete document.password
    })
  }
  findByEmail = (req, resp, next)=>{
    if(req.query.email){
      User.findByEmail(req.query.email)
		  .then(user => user ? [user] : [])
          .then(this.renderAll(resp, next, {
                pageSize: this.pageSize,
                url: req.url
              }))
          .catch(next)
    }else{
      next()
    }
  }

  // o User sempre retorna um array, por isso é necesserário que o findByEmail retorne um arrays
  
  applyRoutes(application: restify.Server){

    application.get({path: `${this.basePath}`, version: '2.0.0'}, 
    [authorize('admin'),
    this.findByEmail,
    this.findAll])
    application.get({path: `${this.basePath}`, version: '1.0.0'}, authorize('admin'), this.findAll)
    application.get(`${this.basePath}/:id`, [authorize('admin'),this.validateId,this.findById])
    application.post(`${this.basePath}`, authorize('admin'),this.save)
    application.put(`${this.basePath}/:id`, 
    [authorize('admin', 'user'),
    this.validateChanges,
    this.validateId,
    this.replace])
    application.patch(`${this.basePath}/:id`, 
    [authorize('admin', 'user'),
    this.validateChanges,
    this.validateId,
    this.update])
    application.del(`${this.basePath}/:id`, authorize('admin'),this.delete)

    application.post(`${this.basePath}/authenticate`, authenticate)

  }
}
export const usersRouter = new UsersRouter()




/*
get > url do recurso > se existir parametro, manda por parâmetro na url
/users/:id pegando um item individual
post > mudança de algo no servidor > já aceita um conteúdo no corpo, é permitido fazer modificações no servidor
*/