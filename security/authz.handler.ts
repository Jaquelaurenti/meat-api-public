import * as restify from 'restify' 
import { ForbiddenError } from 'restify-errors';
 
export const authorize: (...perfis: string []) => restify.RequestHandler = (...perfis)=>{
    return (req,resp,next) =>{
        if(req.authenticated !== undefined && req.authenticated.hasAny(...perfis)){ 
            next()
            req.log.debug('Usuário %s autorizada. Perfil %j e rota %s. Requerido permisssão %j',
                req.authenticated.id,
                req.authenticated.perfil,
                req.path(),
                perfis)
        }else{
            // implementação do log para verificar os erros 
            if(req.authenticated){
                req.log.debug('Permissão negada para %s. Perfis Requeridos: %j. Perfil de Usuário: %j',
                req.authenticated.id, perfis, req.authenticated.perfil)
            }
            next(new ForbiddenError('Permissão Negada'))
        }
    }
}

