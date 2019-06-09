"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    avaliacao: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true,
        maxlength: 500
    },
    restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});
exports.Review = mongoose.model('Review', reviewSchema); //model
