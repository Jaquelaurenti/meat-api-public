"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const menuSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true,
        validate: {
            validator: validators_1.formatReal,
            message: '{PATH}: Valor inválido({VALUE})'
        }
    }
});
const restSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});
exports.Restaurant = mongoose.model('Restaurant', restSchema);
