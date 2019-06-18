import {Server} from './server/server'
import {environment} from './common/environment'
import {usersRouter} from './users/users.router'
import {User} from './users/users.model'
import {Review} from './reviews/reviews.model'
import * as jestCli from 'jest-cli'


let server: Server
const beforeAllTests = ()=>{
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([usersRouter])
        .then(()=>User.remove({}).exec())
        .then(()=>{
            let admin = new User()
            admin.nome = 'admin',
            admin.senha = '123456',
            admin.email = 'admin@email.com',
            admin.perfil = ['admin', 'user']

            return admin.save()
        })
        .then(()=>Review.remove({}).exec())
}

const afterAllTests = ()=>{
    return server.shutdown()
}

beforeAllTests()
.then(()=>jestCli.run())
.then(()=> afterAllTests())
.catch(console.error)