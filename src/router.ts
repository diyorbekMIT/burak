import { Router } from "express";
import memberController from "./controllers/member.controller";
const router = Router();

router.post('/member/signup', memberController.signup);
router.post('/member/login', memberController.login);
router.post("/member/logout", memberController.verifyAuth,memberController.logout);
router.get("/member/detail", memberController.verifyAuth, memberController.getMemberDetail);

export default router;

