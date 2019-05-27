import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'
import { NotFoundError } from 'restify-errors';


class UsersRouter extends Router {
  applyRoutes(application: restify.Server){

    application.get('/users', (req, resp, next)=>{
      User.find().then(this.render(resp,next))
          .catch(next)
    })

    application.get('/users/:id', (req, resp, next)=>{
      User.findById(req.params.id).
            then(this.render(resp,next))
            .catch(next)
    })

    application.post('/users', (req, resp, next)=>{
      let user = new User(req.body)
      user.save().then(this.render(resp,next))
                 .catch(next)
    })

    application.put('/users/:id', (req, resp, next)=>{
      const options = {overwrite: true}
      User.update({_id: req.params.id}, req.body, options)
          .exec().then(result=>{
        if(result.n){
          return User.findById(req.params.id)
        } else{
          throw new NotFoundError('Documento não encontrado!')
        }
      }).then(this.render(resp,next))
        .catch(next)
    })

    application.patch('/users/:id', (req, resp, next)=>{
      const options = {new : true}
      User.findByIdAndUpdate(req.params.id, req.body, options)
          .then(this.render(resp,next))
          .catch(next)
    })

    application.del('/users/:id', (req, resp, next)=>{
        User.remove({_id: req.params.id}).exec().then((cmdresult: any) =>{
            if(cmdresult.result.n){
                resp.send(204)
            }else{
                throw new NotFoundError('Documento não encontrado!')
            }            
            return next()
        }).catch(next)
    })

  }
}

export const usersRouter = new UsersRouter()






/*
get > url do recurso > se existir parametro, manda por parâmetro na url
/users/:id pegando um item individual

post > mudança de algo no servidor > já aceita um conteúdo no corpo, é permitido fazer modificações no servidor


*/