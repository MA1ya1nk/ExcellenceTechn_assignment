import { Router } from "express";
import { login, Register, logout, addTodo, deleteTodo, updateUserDetail, updateUserPassword, editTodo } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()


// router.route("/").get((req, res) => {
//     res.send("User route is working")
// })
router.route("/register").post( Register)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/me").get(verifyJWT, async (req, res) => {
     res.json({
        success: true,
        user: req.user
    })
})
router.route("/addTodo").post(verifyJWT, addTodo)
router.route("/deleteTodo").post(verifyJWT, deleteTodo)

router.route("/updateUserPassword").post(verifyJWT, updateUserPassword)
router.route("/updateUserDetail").post(verifyJWT, updateUserDetail)
router.route("/editTodo").post(verifyJWT, editTodo)



export default router