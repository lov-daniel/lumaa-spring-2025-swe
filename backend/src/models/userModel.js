import pool from "../config/db.js";
import bcrypt from "bcryptjs";

async function createUser(username, password) {

    const SALT_ROUNDS = parseInt(process.env.BCRYPT_HASH_COUNT) || 10;

    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashed]
    );
    return result.rows[0];
}

async function findByUsername(username) {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return result.rows[0];
}

async function validatePassword(password, existingPassword) {
    const isValidPassword = await bcrypt.compare(password, existingPassword);
    return isValidPassword;
}

export {createUser, findByUsername, validatePassword};