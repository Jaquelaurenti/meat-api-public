import * as restify from 'restify'
import {User} from '../users/users.model'
import * as jwt from 'jsonwebtoken'
import {environment} from '../common/environment'

export const tokenParser: restify.RequestHandler = (req,resp,next) =>{
    const token = extractToken(req)
    if(token){
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    }else{
        next(false)
    }
}

function extractToken(req: restify.Request){
    // Token virá via headers Authorization: Bearer TOKEN
    let token = undefined
    const authorization = req.header('authorization') 
    if(authorization){
        const parts: string[] = authorization.split('')
        if(parts.length ===2 && parts[0] === 'Bearer'){
           token = parts[1]
        }
        return token
    }
}

function applyBearer(req: restify.Request, next): (error, decoded) => void{
    return (error, decoded) => {
        if(decoded){
            User.findByEmail(decoded.sub).then(user=>{
                if(user){
                    // associar o usuário ao request
                    req.authenticated = user
                }else{
                    next()
                }
            }).catch(next)
        }else{
            next()
        }
    }
}
// extrai o token, caso exista na aplicação, verifica o usuário, caso exista, ele será associado ao Request.