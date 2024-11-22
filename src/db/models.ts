import pkg from 'mongoose';
const { model, Schema } = pkg;
import { config } from 'dotenv';
config();

interface IUser {
    uid: string;
    balance: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: pkg.Schema = new Schema<IUser>({
    uid: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Users: pkg.Model<IUser> = model<IUser>('Users', userSchema);