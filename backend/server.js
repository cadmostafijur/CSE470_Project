import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import User from "./models/user.model.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Password Reset Routes
app.post('/api/forget-password', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json({ message: 'Username validated. Proceed with password reset.' });
        } else {
            res.status(400).json({ error: 'Invalid username.' });
        }
    } catch (error) {
        console.error('Error in forget password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate(
            { username },
            { password: hashedPassword },
            { new: true }
        );

        if (user) {
            res.status(200).json({ message: 'Password reset successful.' });
        } else {
            res.status(400).json({ error: 'Failed to reset password.' });
        }
    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Catch-all route for SPA
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
});

process.on("SIGINT", () => {
    console.log("Something went wrong");
});