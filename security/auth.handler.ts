import * as restify from 'restify'
import {User} from '../users/users.model'
import { NotAuthorizedError } from 'restify-errors';
import * as jwt from 'jsonwebtoken'
import {environment} from '../common/environment'

export const authenticate: restify.RequestHandler = (req, resp, next)=>{
    const {email, senha} = req.body
    User.findByEmail(email, '+senha') // projeção para que seja feita a query trazendo a senha, sem quebrar o que já foi implementado
        .then(user=>{
            if(user && user.matches(senha)){
            // gerar o token
            const token = jwt.sign({sub: user.email, iss: 'meat-api'},
                        environment.security.apiSecret) // email é importante para o processo inverso 
                resp.json({nome: user.nome, email: user.email, accessToken: token})
                return next(false)
            }
            else{
            // indicando o motivo da falha 
            return next (new NotAuthorizedError('Credenciais Inválidas!'))
            }
        }).catch(next)

}