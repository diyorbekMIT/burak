import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (err) {
        console.log("Error, goHome", err);
        res.status(500).send("Error occurred on the Home Page");
        res.redirect("/admin");
    }
};

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login Page");
    } catch (err) {
        console.log("Error, getLogin", err);
        res.status(500).send("Error occurred on the Login Page");
        res.redirect("/admin");
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.send("Signup Page");
    } catch (err) {
        console.log("Error, getSignup", err);
        res.status(500).send("Error occurred on the Signup Page");
        res.redirect("/admin");
    }
};

restaurantController.processLogin = async(req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin");
        console.log("body: ", req.body);
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input);
        
        req.session.member = result;
        req.session.save(function() {
            res.send(result)
        });
    } catch (err) {
        console.log("Error, processLogin", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
        );
    }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
	try {
		console.log("processSignup!");

		const newMember: MemberInput = req.body;
		newMember.memberType = MemberType.RESTAURANT;

		const memberService = new MemberService();
		const result = await memberService.processSignup(newMember);
  
        req.session.member = result;
        req.session.save(function() {
            res.send(result)
        });
    } catch (err) {
        console.log("Error, processLogin", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('admin/signup') </script>`
        );
	}
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function() {
            res.redirect("/admin");
        });
    }catch (err) {
        console.log("Error, logout", err);
        res.redirect("/admin");
    }
};

restaurantController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try{
        console.log("CheckAuthSession");
        if (req.session?.member)
          res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert("${Message.NOT_AUTHONTICATED}") </script>`)
    } catch(err) {
        console.log("Error, checkAuthSession", err);
        res.send(err);
    }
};

export default restaurantController;
