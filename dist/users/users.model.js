"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    }
});
exports.User = mongoose.model('User', userSchema);
/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupamos os objetos dentro dessa colection que tenham objetos similares.
Quais serão as propriedades que os documentos terão

Schema - Informa ao mongoose quais são os metadados dos documentos
Model  - manipular os documentos

*/ 
