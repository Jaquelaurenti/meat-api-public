import * as mongoose from 'mongoose'
import { Restaurant } from '../restaurants/restaurants.model';
import { User } from '../users/users.model';
// definicao do modelo
export interface Review extends mongoose.Document{
    data: Date, 
    avaliacao: Number, 
    comentario: String, 
    restaurante: mongoose.Schema.Types.ObjectId | Restaurant //  UNION TYPE declarado o tipo restaurant para popular o atributo, então ele sempre ira vir do banco como object id, mas iremos dizer ao mongoose para buscar os dados do documento e substituir os dados pelo documento 
    usuario: mongoose.Schema.Types.ObjectId | User
}

const reviewSchema = new mongoose.Schema({
    data:{
        type: Date,
        required: true
    },
    avaliacao:{
        type: Number,
        required: true
    },
    comentario:{
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

})

export const Review = mongoose.model<Review>('Review', reviewSchema) //model