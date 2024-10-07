import { Request, Response } from "express";
import User from "../entities/user";
import { redisClient } from "../redisClient";
import jwt, { JwtPayload } from "jsonwebtoken";

export const updateUser = async (req: Request, res: Response) => {
  const { name, photoUrl, address, studentNum, photoBase64 } = req.body;
  console.log("photoUrl", photoUrl);

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.error("--== es ==-- No token, authorization denied");
      return;
    }

    const isExist = await redisClient.get(token);
    if (!isExist) {
      console.error("--== es ==-- Token is not fonud");
      return;
    }

    const decoded = jwt.verify(
      token,
      "--== es ==-- your_jwt_secret"
    ) as JwtPayload;

    console.log("decoded", decoded);

    if (!decoded) {
      console.error("--== es ==-- Token is not valid");
      return;
    }

    const user = await User.findOneBy({ id: Number(decoded.id) });
    if (!user) {
      console.error("--== es ==-- not existed user");
      return;
    }

    // const user = new User();
    user.name = name;
    user.photoUrl = photoUrl;
    user.address = address;
    user.studentNum = studentNum;
    user.photoBase64 = photoBase64;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
