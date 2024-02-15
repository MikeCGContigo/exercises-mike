import { Router } from "express";
import userRouter from "./users.js";

const router = Router();

router.get('/', (req, res) => res.send("Hola papusho!"));
router.use('/users', userRouter);

export default router;