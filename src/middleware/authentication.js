import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS, ERROR_MESSAGES } from "../utils/http-constants.js";

dotenv.config();

function verifyToken(req, res, next){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: HTTP_STATUS.UNAUTHORIZED,
            message: ERROR_MESSAGES.TOKEN_NOT_PROVIDED
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(error){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: ERROR_MESSAGES.INVALID_TOKEN
            });
        }

        req.usuario = decoded;
        next();
    });
}

export default verifyToken;