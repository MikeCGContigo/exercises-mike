import { DataTypes } from "sequelize";
import Sequelize from "./config.js";
import bcrypt from "bcrypt";

const saltRounds = 12;
const User = Sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.beforeSave(user => {
    return bcrypt.hash(user.password, saltRounds)
        .then(hash => user.password = hash)
        .catch(err => console.error(err))
});

export default User;
