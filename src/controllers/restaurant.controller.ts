import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("Error, goHome", err);
        res.status(500).send("Error occurred on the Home Page");
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login Page");
    } catch (err) {
        console.log("Error, getLogin", err);
        res.status(500).send("Error occurred on the Login Page");
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.send("Signup Page");
    } catch (err) {
        console.log("Error, getSignup", err);
        res.status(500).send("Error occurred on the Signup Page");
    }
};

restaurantController.processLogin = async(req: Request, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body: ", req.body);
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input);
        res.send(result);
    } catch (err) {
        console.log("Error, processLogin", err);
        res.send(err);
    }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
	try {
		console.log("processSignup!");

		const newMember: MemberInput = req.body;
		newMember.memberType = MemberType.RESTAURANT;

		const memberService = new MemberService();
		const result = await memberService.processSignup(newMember);
		console.log(result);

		res.send(result);
	} catch (err: any) {
		res.send(err);
	}
};

export default restaurantController;
