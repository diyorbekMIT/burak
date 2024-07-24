import { Router } from "express";
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
const router = Router();

/**  MEMBER **/
router.get("/member/restaurant", memberController.getRestaurant);
router.post('/member/signup', memberController.signup);
router.post('/member/login', memberController.login);
router.post("/member/logout",
   memberController.verifyAuth,
   memberController.logout);
router.get("/member/detail", 
   memberController.verifyAuth, 
   memberController.getMemberDetail);


router.post("/member/update", 
   memberController.verifyAuth, 
   uploader("members").single("memberImage"),
   memberController.updateMember);

router.get("/member/top-users", memberController.getTopUsers)



/**  Products **/
router.get("/product/all", productController.getProducts);


export default router;

