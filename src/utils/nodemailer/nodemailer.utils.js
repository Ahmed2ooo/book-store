
import nodemailer from 'nodemailer'; // Use import instead of require (ES6 style)
import env from "dotenv";
import { verifyAccountTamplate } from './verifyAccount.template.js';

import jwt from 'jsonwebtoken';
env.config();

export const sendEmail = async (email) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // SMTP server for Gmail
            port: 587,              // Usually 587 for TLS, 465 for SSL
            secure: false,          // Use true for port 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,  // Get your email from env variable
                pass: process.env.EMAIL_PASS   // Get your password from env variable
            },
        });

        // Email options
        const emailToken = jwt.sign({email},process.env.SECRET_KEY)
          const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender address
            to: email,            // Receiver
            subject: "Hello from Nodemailer", // Subject
            text:"Book_store",
            html:verifyAccountTamplate(emailToken)  // Plain text content
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return `Email sent to ${email}`;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error("Error sending email");
    }
};
