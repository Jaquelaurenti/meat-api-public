import * as mongoose from 'mongoose'
import { formatReal } from '../common/validators';

export interface MenuItem extends mongoose.Document {
  nome: string,
  valor: number
}

export interface Restaurant extends mongoose.Document {
  nome: string,
  menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  }
})

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
})


export const Restaurant = mongoose.model<Restaurant>('Restaurante', restSchema)
