import pkg from 'mongoose';
import { Users } from './models.js'
const { connect } = pkg;
export var cachedUsers = {}
export var db;

export async function connectToDB(url) {
    db = await connect(url, {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true
        }
    })
    console.log("Connected to DB successfully")
}

export async function createUser(id, bal) {
    const find = await getUser(id)
    if (find !== null) return find

    const user = new Users({
        uid: id,
        balance: bal ?? 0,
    })

    const res = await user.save()
    return res
}

export async function getUser(id) {
    let query = await Users.find({ uid: id })
    if (query.length !== 1) return null
    return query[0]
}

export async function getUsers() {
    return await Users.find({})
}

export async function getSortedUsers() {
    return (await getUsers()).sort((a, b) => b.balance - a.balance)
}