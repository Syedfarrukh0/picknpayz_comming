"use server";

import nodemailer from "nodemailer";

export async function sendMail(formData: FormData) {
  const email = formData.get("email") as string;
  console.log(email, "mail");

  if (!email) {
    return { success: false, error: "Please fill out all fields" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PicknPayz - Welcome to Our Community!</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #fff;">
    <!-- Centered Card -->
    <div style="max-width: 400px; margin: 20px auto; padding: 24px; background-color: #FAEBF7; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="font-size: 22px; font-weight: bold; color: #333D79; margin: 0;">PicknPayz</h1>
            <p style="color: #6b7280; margin-top: 8px; font-size: 14px;">Your One-Stop Online E-Commerce Store</p>
        </div>

        <!-- Main Content -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #333D79; margin-bottom: 16px;">🎉 Welcome to PicknPayz!</h2>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5;">
                Ready to shop smarter? You're now part of the PicknPayz family! Get ready for exclusive deals, trending products, and surprises you'll love. 🛍️
            </p>
        </div>

        <!-- Updates Section -->
        <div style="text-align: left; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #333D79; margin-bottom: 16px; text-align: center;">🔥 What's Hot?</h2>
            <ul style="list-style-type: disc; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.5;">
                <li>🚀 <strong>New Arrivals:</strong> Fresh trends just landed!</li>
                <li>🎁 <strong>Exclusive Deals:</strong> Save up to 50% on top picks.</li>
                <li>⏳ <strong>Flash Sales:</strong> Limited time, unlimited savings!</li>
            </ul>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="font-size: 18px; font-weight: 600; color: #333D79; margin-bottom: 16px;">✨ Why PicknPayz?</h2>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                From fast delivery to secure payments, we make shopping effortless and fun. Let’s get started soon!
            </p>
           <!-- <a href="#" style="display: inline-block; padding: 10px 24px; background-color: #333D79; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 14px;">Start Shopping Now</a> -->
        </div>

        <!-- Footer -->
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280;">
            <p style="margin-top: 8px;">© 2025 PicknPayz. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "PicknPayz - Online Store",
      // text: `Email: ${email}\nMessage: Hellow`
      cc: process.env.SMTP_USER,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while sending the email",
    };
  }
}
