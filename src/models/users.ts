import { Schema, model } from "mongoose"

interface IUser {
    username: string,
    email?: string,
    password: string,
    avatar?: string,
    bio?: string,
    pronouns?: string,
    location?: string,
    displayName?: string,
    groups?: string[]
}

const UsersSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true },
    email: {type: String, required: false, unique: false },
    password: {type: String, required: true, unique: false },
    avatar: String,
    bio: String,
    pronouns: String,
    location: String,
    displayName: String,
    groups: Array<String>
})

const User = model<IUser>('User', UsersSchema);

export default User; 
export type {IUser};