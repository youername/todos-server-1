import { Request, Response } from "express";
import User from "../entities/user";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

const logoutUser = (req: Request, res: Response) => {};

export { registerUser, loginUser, logoutUser };
