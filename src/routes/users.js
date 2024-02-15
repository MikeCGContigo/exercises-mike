import { Router } from "express";
import userController from "../controllers/users.js";
import verifyToken from "../middleware/authentication.js";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send("Usuario Bonito"));
userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.get('/get-all', verifyToken, userController.getAllUsers);

export default userRouter;