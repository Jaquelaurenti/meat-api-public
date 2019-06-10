import * as mongoose from 'mongoose'
import { validaCPF } from '../common/validators';
import * as bcrypt from 'bcrypt'
import { environment } from '../common/environment';

export interface User extends mongoose.Document{
    nome: string, 
    email: string, 
    senha: string
}
// Apenas para controle estático

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email: string): Promise<User>
}

const userSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        maxlength:80,
        minlength:3
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    senha:{
        type: String,
        select: false, // indica ao mongoose que não pode trazer esse campo como padrão
        required: true
    },
    sexo:{
        type: String, 
        required: false,
        enum: ['Masculino', 'Feminino']

    },
    cpf:{
        type: String, 
        required: false,
        validate:{
            validator:validaCPF,
            message: '{PATH}: CPF inválido({VALUE})'
        }
    }
})
/* registrando as middleware do schema
A função que está sendo passada no pré não pode ser utilizada arrow function, pois dessa forma, o mongoose nao conseguiria atribuir valor ao this, pois o arrow function 
impediria o this de ser capturado, pois a funçao do arrow function serve para impedir certos problemas tipo bindevents.*/

userSchema.statics.findByEmail = function(email: string){
    return this.findOne({email}) //{email: email}
}

const hashSenha = (obj, next)=>{
    bcrypt.hash(obj.senha, environment.security.saltRounds)
            .then(hash=>{
              obj.senha = hash
              next()
            }).catch(next)
}

const saveMiddleware = function (next){
    const user: User = this
    if(!user.isModified('senha')){
        next()
      }
      else{
          hashSenha(user, next)
      }
}

const updateMiddleware = function (next){
    if(!this.getUpdate().senha){
        next()
      }else{
        hashSenha(this.getUpdate(), next)
      }
}

userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema)


/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupamos os objetos dentro dessa colection que tenham objetos similares.
Quais serão as propriedades que os documentos terão

Schema - Informa ao mongoose quais são os metadados dos documentos
Model  - manipular os documentos

*/