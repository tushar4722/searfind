const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Mail options
    const mailOptions = {
      from: `"SearFind" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent: ${info.messageId}`)
    return info

  } catch (error) {
    console.error(`❌ Email error: ${error.message}`)
    throw error
  }
}

module.exports = sendEmail