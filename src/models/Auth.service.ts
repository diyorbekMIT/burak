import { resolve } from "path";
import { Member } from "../libs/types/member";
import { AUTH_TIMER } from "../libs/config";
import jwt from "jsonwebtoken";
import Errors, { HttpCode, Message } from "../libs/Errors";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
    private readonly secretToken;
    constructor() {
        this.secretToken = process.env.SECRET_TOKEN;
    }

    public createToken(payload: Member) {
        return new Promise((resolve, reject) => {
            const duration = `${AUTH_TIMER}`;
            jwt.sign(
                payload, 
                process.env.SECRET_TOKEN as string, 
                {expiresIn: duration}, 
                (err, token) => {
                   if(err) reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED));
                   else resolve(token as string);
            });
        })
    }

    public async checkAuth(token: string): Promise<Member>{
        const result: Member = (await jwt.verify(token, this.secretToken!)) as Member
        return result
    }

}

export default AuthService;