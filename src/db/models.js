import pkg from 'mongoose';
const { model, Schema, SchemaTypes } = pkg;
import {config} from 'dotenv';
config()

const deptorSchema = new Schema({   
    id: SchemaTypes.ObjectId,
    original: Number,
    amount: Number,
    created: Number,
    payby: Number,
    interest: Number
})

const requestSchema = new Schema({   
    reqtype: String,
    reqid: SchemaTypes.ObjectId,
})

const creditorSchema = new Schema({   
    id: SchemaTypes.ObjectId,
    amount: Number,
})

const userSchema = new Schema({
    uid: { type: String, required: true },
    balance: { type: Number, default: 0 },
    deptors: [deptorSchema],
    creditors: [creditorSchema],
    requests: [requestSchema],
}, { timestamps: true })

export const Users = model('Users', userSchema)