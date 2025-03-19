"use server";

import nodemailer from "nodemailer";

export async function sendMail (formData: FormData) {
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!email || !message) {
        return { success: false, error: "Please fill out all fields" }
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "New message from portfolio",
            text: `Email: ${email}\nMessage: ${message}`
        })

        return { success: true };

    } catch (error) {
        console.log(error);
        return { success: false, error: "An error occurred while sending the email" }
    }
}