import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import {mergePatchBodyParser} from './merge-patch.parser'
import { handleError } from './error.handler';
import {tokenParser} from '../security/token.parser'
import * as fs from 'fs'
import {logger} from '../common/logger'

export class Server {

  application: restify.Server

  initializeDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    })
  }

  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject)=>{
      try{

        const options: restify.ServerOptions ={
          name: 'meat-api',
          version: '1.0.0',
          log: logger  //criará um logger à partir do logger (que será um logger filho), sempre que for feita uma referencia ele irá acrescentar ao Log. << importante para filtros >>
        }

        if(environment.security.enableHTTPS){
          options.certificate = fs.readFileSync(environment.security.certificate),
          options.key = fs.readFileSync(environment.security.key)
        }

        this.application = restify.createServer(options)

        this.application.pre(restify.plugins.requestLogger({
          log: logger  //prepara o logger
        }))

        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())
        this.application.use(mergePatchBodyParser)
        this.application.use(tokenParser) // disponivel em todo request que contenha o Token

        //routers
        for (let router of routers) {
          router.applyRoutes(this.application)
        }

        this.application.listen(environment.server.port, ()=>{
           resolve(this.application)
        })

        this.application.on('restifyError', handleError)

      }catch(error){
        reject(error)
      }
    })
  }

  bootstrap(routers: Router[] = []): Promise<Server>{
      return this.initializeDb().then(()=>
             this.initRoutes(routers).then(()=> this))
  }

  shutdown(){
    return mongoose.disconnect().then(()=>this.application.close)
  }

}


/*
 >>>> comentarios
resp.contentType = 'application/json';
resp.status(400)
resp.setHeader('Content-Type', 'application/json')
resp.sen({message:'hello'});
formas de chamar o headers e enviando o conteúdo da requisição
*/




