import { resolve } from "url";
import { rejects } from "assert";
import * as restify from 'restify'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import * as mongoose from 'mongoose'


export class Server {

    application: restify.Server

    initializeDb(): mongoose.MongooseThenable{
        mongoose.Promise == global.Promise
        return mongoose.connect(environment.db.url,{
            useMongoClient: true
        })

    }

    initRoutes(routers :Router[] = []): Promise<any>{
        return new Promise((resolve, reject)=>{
            try
            {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })
                this.application.use(restify.plugins.queryParser())
                // rotas
                routers.forEach(element => {
                    element.applyRoutes(this.application)                    
                });

                this.application.listen(environment.server.port,()=>{
                    resolve(this.application)
                })
            }
            catch(error)
            {
                rejects(error)
            }
        })
    }

    bootstrap(routers :Router[] = []): Promise<Server>{        
        return  this.initializeDb().then(()=> 
                this.initRoutes(routers).then(()=>this))       
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




