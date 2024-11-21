import pkg from 'mongoose';
const { connect, connection, disconnect, model, Schema } = pkg;
import {config} from 'dotenv'; config()

const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export const Users = model('Users', userSchema)