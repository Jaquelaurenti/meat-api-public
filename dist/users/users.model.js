"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});
exports.User = mongoose.model('User', userSchema);
/*
O mongoose ele tem uns objetos que precisaremos usar, ou seja o Schema, o mongo não obrigada seguir um Schema.
O ideal é quando temos uma colection é que agrupemos objetos dentro dessa colection que tenham objetos similares.
Quais serão as propriedades que os documentos terão
*/ 
