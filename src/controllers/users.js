import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/http-constants.js";

dotenv.config();

async function createUser(req, res) {
    try {
        const user = req.body;
        const { firstName, lastName, email, password } = user;

        // Verifica si el email ingresado ya existe en la BD
        const isEmailAllReadyExist = await User.findOne({
            email: email
        });
        if (isEmailAllReadyExist) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: HTTP_STATUS.BAD_REQUEST,
                message: ERROR_MESSAGES.EMAIL_ALL_READY_USE
            });
        }

        // Crea al usuario con la información enviada desde el cliente
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });
        res.status(HTTP_STATUS.SUCCESS).json({
            status: HTTP_STATUS.CREATED,
            success: true,
            message: SUCCESS_MESSAGES.USER_CREATED,
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            message: error.toString()
        });
    }
}

async function login(req, res) {
    try {
        const user = req.body;
        const { email, password } = user;
        const isUserExist = await User.findOne({
            where: {
                email: email
            }
        });

        // Verifica si existe un usuario que posea el email enviado en la BD
        if (!isUserExist) {
            console.error( HTTP_STATUS.NOT_FOUND + ":", ERROR_MESSAGES.USER_NOT_FOUND);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                message: ERROR_MESSAGES.INCORRECT_CREDENTIALS
            });
        }

        /* Compara las contraseñas por medio de un método de incriptación para ver si ambas coinciden:
            la contraseña enviada y la que se encuentra almacenada en la BD */
        bcrypt.compare(password, isUserExist.password, (error, result) => {
            if (result) {
                const token = jwt.sign(
                    { 
                        _id: isUserExist.id, 
                        firstName: isUserExist.firstName, 
                        lastName: isUserExist.lastName, 
                        email: email 
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: process.env.EXPIRATION }
                );
                res.status(HTTP_STATUS.SUCCESS).json({
                    status: HTTP_STATUS.SUCCESS,
                    success: true,
                    message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
                    token: token
                })
            } else {
                console.error( HTTP_STATUS.UNAUTHORIZED + ":", ERROR_MESSAGES.INCORRECT_PASSWORD);
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    status: HTTP_STATUS.BAD_REQUEST,
                    success: false,
                    message: ERROR_MESSAGES.INCORRECT_CREDENTIALS
                });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: HTTP_STATUS.BAD_REQUEST,
            message: error.toString()
        });
    }
}

async function getAllUsers(req, res) {
    const users = await User.findAll();

    res.status(HTTP_STATUS.SUCCESS).json({
        status: HTTP_STATUS.SUCCESS,
        data: users
    });
}

export default {
    createUser,
    login,
    getAllUsers
}