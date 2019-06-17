import * as restify from 'restify' 
import { ForbiddenError } from 'restify-errors';
 
export const authorize: (...perfis: string []) => restify.RequestHandler = (...perfis)=>{
    return (req,resp,next) =>{
        if(req.authenticated !== undefined && req.authenticated.hasAny(...perfis)){ 
            next()
        }else{
            next(new ForbiddenError('Permissão Negada'))
        }
    }
}