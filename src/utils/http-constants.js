export const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
    EMAIL_ALL_READY_USE: "Este correo electrónico está actualemte en uso por otro usuario",
    INCORRECT_CREDENTIALS: "Credenciales incorrectas",
    USER_NOT_FOUND: "No se logró encontrar al usuario",
    INCORRECT_PASSWORD: "Contraseña incorrecta",
    TOKEN_NOT_PROVIDED: "No se proporcionó o encontró ningún token",
    INVALID_TOKEN: "Token no válido"
};

export const SUCCESS_MESSAGES = {
    USER_CREATED: "Usuario creado exitosamente",
    LOGIN_SUCCESS: "inicio de sesión exitoso"
}