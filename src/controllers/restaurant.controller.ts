import express, { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();

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
        res.render("login");
    } catch (err) {
        console.log("Error, getLogin", err);
        res.status(500).send("Error occurred on the Login Page");
        res.redirect("/admin");
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");
        res.render("signup");
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
            res.redirect("/admin/product/all");
        });
    } catch (err) {
        console.log("Error, processLogin", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
        );
    }
};

restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
	try {
		console.log("processSignup!");
        const file = req.file;
        
		const newMember: MemberInput = req.body;
        newMember.memberImage = file?.path;
		newMember.memberType = MemberType.RESTAURANT;

		const memberService = new MemberService();
		const result = await memberService.processSignup(newMember);
  
        req.session.member = result;
        req.session.save(function() {
            res.redirect("/admin/product/all");
        });
    } catch (err) {
        console.log("Error, processLogin", err);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
        );
	}
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout");
        req.session.destroy(function() {
            res.redirect("/admin/signup");
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

restaurantController.getUsers = async (req: AdminRequest, res: Response) => {
    try {
        console.log("getUsers");
        const result = await memberService.getUsers();
        console.log("result: ", result);

        res.render("users", {users: result});

    } catch (err) {
        console.log("Error, getUsers", err);
        res.redirect("/admin/login");
    }
};

restaurantController.updateChosenUser = async (req: AdminRequest, res: Response) => {
    try {
        console.log("updateChosenUser")
        const result = await memberService.updateChosenUser(req.body);
        res.status(HttpCode.OK).json({ data: result })
    } catch (err) {
        console.log("Error, ProcessLogin", err);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)
    }

};
restaurantController.verifyRestaurant = (req: AdminRequest, res: Response, next: NextFunction) => {
    if (req.session?.member?.memberType === MemberType.RESTAURANT){
        req.member = req.session.member;
        next();
    }
    else {
    const message = Message.NOT_AUTHONTICATED;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/login');</script>`);
    }
}
export default restaurantController;
