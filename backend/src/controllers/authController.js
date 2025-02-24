import jwt from "jsonwebtoken";
import { createUser, findByUsername, validatePassword } from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await findByUsername(username);
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    const newUser = await createUser(username, password);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    res.status(201).json({
       token, 
       user: {
        username: newUser.username,
        userID: newUser.id,
       } 
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("logging user in");
    const existingUser = await findByUsername(username);

    if (!existingUser) {
        return res.status(400).json({error: "User not found"});
    }

    try {
      const isValidPassword = await validatePassword(password, existingUser.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({
          id: existingUser.id,
          username: existingUser.username
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION
        }
      
      )

        res.status(201).json({ 
          token, 
          user: {
            username: existingUser.username,
            userID: existingUser.id,
          } 
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

export default { registerUser, loginUser };
