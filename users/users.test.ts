import 'jest'
import * as request from 'supertest'
import {Server} from '../server/server'
import {environment} from '../common/environment'
import {usersRouter} from './users.router'
import {User} from './users.model'

let address: string
let server: Server
beforeAll(()=>{
  environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
  environment.server.port = process.env.SERVER_PORT || 3001
  address = `http://localhost:${environment.server.port}`
  server = new Server()
  return server.bootstrap([usersRouter])
               .then(()=>User.remove({}).exec())
               .catch(console.error)
})

test('get /users', ()=>{
  return request(address)
     .get('/users')
     .then(response=>{
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)
     }).catch(fail)
})

test('post /users', ()=>{
  return request(address)
     .post('/users')
     .send({
       nome: 'usuario1',
       email: 'usuario1@email.com',
       senha: '123456',
       cpf: '962.116.531-82'
     })
     .then(response=>{
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined()
        expect(response.body.nome).toBe('usuario1')
        expect(response.body.email).toBe('usuario1@email.com')
        expect(response.body.cpf).toBe('962.116.531-82')
        expect(response.body.senha).toBeUndefined()
     }).catch(fail)
})

test('get /users/aaaaa - not found', ()=>{
  return request(address)
     .get('/users/aaaaa')
     .then(response=>{
      expect(response.status).toBe(404)
     }).catch(fail)
})

test('patch /users/:id', ()=>{
  return request(address)
     .post('/users')
     .send({
       nome: 'usuario2',
       email: 'usuario2@email.com',
       senha: '123456'
     })
     .then(response => request(address)
                      .patch(`/users/${response.body._id}`)
                      .send({
                        nome: 'usuario2 - patch'
                      }))
     .then(response=>{
       expect(response.status).toBe(200)
       expect(response.body._id).toBeDefined()
       expect(response.body.nome).toBe('usuario2 - patch')
       expect(response.body.email).toBe('usuario2@email.com')
       expect(response.body.senha).toBeUndefined()
     })
     .catch(fail)
})

afterAll(()=>{
  return server.shutdown()
})
