import pkg from 'mongoose';
const { model, Schema } = pkg;
import {config} from 'dotenv'; config()

const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    deptors: [
        {
            uid: String,
            original: Number,
            amount: Number,
            payby: Date,
            interest: Number
        }
    ],
    creditors: [
        {
            uid: String,
            original: Number,
            amount: Number,
            payby: Date,
            interest: Number
        }
    ]
}, { timestamps: true })

export const Users = model('Users', userSchema)