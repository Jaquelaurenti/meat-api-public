"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
// Apenas para controle estático
const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    senha: {
        type: String,
        select: false,
        required: true
    },
    sexo: {
        type: String,
        required: false,
        enum: ['Masculino', 'Feminino']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validaCPF,
            message: '{PATH}: CPF inválido({VALUE})'
        }
    }
});
/* registrando as middleware do schema
A função que está sendo passada no pré não pode ser utilizada arrow function, pois dessa forma, o mongoose nao conseguiria atribuir valor ao this, pois o arrow function
impediria o this de ser capturado, pois a funçao do arrow function serve para impedir certos problemas tipo bindevents.*/
const hashSenha = (obj, next) => {
    bcrypt.hash(obj.senha, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.senha = hash;
        next();
    }).catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('senha')) {
        next();
    }
    else {
        hashSenha(user, next);
    }
};
const updateMiddeware = function (next) {
    if (!this.getUpdate().senha) {
        next();
    }
    else {
        hashSenha(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddeware);
userSchema.pre('update', updateMiddeware);
exports.User = mongoose.model('User', userSchema);
/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupamos os objetos dentro dessa colection que tenham objetos similares.
Quais serão as propriedades que os documentos terão

Schema - Informa ao mongoose quais são os metadados dos documentos
Model  - manipular os documentos

*/ 
