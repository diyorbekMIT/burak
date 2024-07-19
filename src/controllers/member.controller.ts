import { Request, Response } from 'express';
import { T } from "../libs/types/common";
import { MemberType } from '../libs/enums/member.enum';
import { LoginInput, Member, MemberInput } from '../libs/types/member';
import MemberService from '../models/Member.service';
import Errors, { HttpCode, Message } from '../libs/Errors';
import AuthService from '../models/Auth.service';
import { AUTH_TIMER } from '../libs/config';


const memberService = new MemberService()
const authService = new AuthService();
const memberController: T = {}

//REACT



memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("Signup")

        const input: MemberInput = req.body,
           result: Member = await memberService.signup(input),
           token = await authService.createToken(result);
            console.log("token: ", token);
        // TODO: Tokens

        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });
            
            console.log(result);
        // TODO: Tokens

        res.status(HttpCode.CREATED).json({ member: result, accessToken: token })
    } catch (err) {
        console.log("Error, signup", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)


    }
};

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("Login")
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);
            console.log("token: ", token);

        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });
            
            console.log(result);
        // TODO: Tokens

        res.status(HttpCode.OK).json({ member: result, accessToken: token })
    } catch (err) {
        console.log("Error, login", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)

    }
};

memberController.verifyAuth = async (req: Request, res: Response) => {
    try {
        let member = null;
       const token = req.cookies["accessToken"];
       if (token) member = await authService.checkAuth(token);

       if (!member) throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHONTICATED)
       
       console.log("member: ", member);
       res.status(HttpCode.OK).json({member : member});
    } catch (err) {
        console.log("Error, VerifyAuth", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)

    }
}

export default memberController