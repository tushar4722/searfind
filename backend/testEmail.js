/*require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'SearFind Test Email',
  text: 'Email is working!'
}).then(r => {
  console.log('✅ Email sent successfully:', r.messageId)
}).catch(e => {
  console.log('❌ Email failed:', e.message)
})
*/