import {User} from './users/users.model'

declare module 'restify'{
    export interface Request {
        authenticated: User
    }
}


// arquivo de declaração criado para incrementar a declaração da interface Request.
// O typescript automaticamente procura pelo arquivo index.d.ts e por isso foi feita a declaração de interface para que seja feito o merge com a interface atual