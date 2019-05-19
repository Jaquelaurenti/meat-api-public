import * as mongoose from 'mongoose'

export interface User extends mongoose.Document{
    name: string, 
    email: string, 
    password: string
}
// Apenas para controle estático

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        select: false // indica ao mongoose que não pode trazer esse campo como padrão
    }
})

export const User = mongoose.model<User>('User', userSchema)


/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupamos os objetos dentro dessa colection que tenham objetos similares.
Quais serão as propriedades que os documentos terão

Schema - Informa ao mongoose quais são os metadados dos documentos
Model  - manipular os documentos

*/