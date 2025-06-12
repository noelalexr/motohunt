import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

import userModel from "../models/userModel.js";

import sendEmail from "../services/mailService.js";

dotEnv.config();

const register = async (req, res) => {
    const payload = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const savedUser = await userModel.create({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
        });

        //SEND EMAIL
        await sendEmail(
            "Support App",
            savedUser.email,
            `Welcome to MotoHUNT - Your Registration is Complete!`,
            `
                Dear ${savedUser.name},<br><br>
                Welcome to MotoHUNT, where your two-wheeled adventures begin.<br>
                We're excited to have you join our growing community of motorcycle enthusiasts, buyers, and riders.<br><br>

                Your account registration has been successfully completed, and you're now ready to explore:<br>
                · Thousands of motorcycles across various brands and styles<br>
                · Trusted providers<br>
                · Transparent pricing with no hidden fees<br><br>

                Your MotoHUNT Account Details:<br>
                · Name: ${savedUser.name}<br>
                · Email: ${savedUser.email}<br><br>

                You can now log in to your dashboard, update your profile, and begin your first search.<br>
                Access your dashboard here: <a href="https://motohunt.com/dashboard">https://motohunt.com/dashboard</a><br><br>

                If you did not initiate this registration, or you believe someone else used your email address in error, please contact us immediately at <a href="mailto:noelalexr@gmail.com">contact support</a>.<br><br>

                Thank you for choosing MotoHunt - we're here to fuel your journey.<br><br>

                Warm regards,<br>
                The MotoHunt<br><br>

                <hr><br>

                <strong>Need help?</strong><br>
                📧 <a href="mailto:noelalexr@gmail.com">noelalexr@gmail.com</a><br>
                🌐 <a href="https://motohunt.com" target="_blank">motohunt.com</a>
            `
        )

        res.status(201).json({message: "Registered Successfully"});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    const payload = req.body;


    try {
        const user = await userModel.findOne({email: payload.email});

        if (!user) return res.status(400).json({error: "Invalid Credentials"});

        const passwordMatched = await bcrypt.compare(payload.password, user.password);
        if (!passwordMatched)
            return res.status(400).json({error: "Invalid Credentials"});

        //GENERATE TOKEN
        const token = jwt.sign(
            {userId: user._id, name: user.name}, 
            process.env.JWT_SECRET, 
            {expiresIn: "1h"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 36000000,
        });

        res.json({message: "Login Successfully!", token: token});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict", // match your login settings
    });

    res.json({ message: "Logout Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
};

export { register, login, logout };