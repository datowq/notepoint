require('dotenv').config();

const frontend_uri = process.env.FRONTEND_URL;

module.exports = {

  confirm: id => ({
    subject: 'NotePoint Email Adress Verification',
    html: `
      <a href='${frontend_uri}/verify/${id}'>
        Click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${frontend_uri}/verify/${id}`
  }),

  recover: id => ({
    subject: 'Recover your NotePoint account', 
    html: `
      <a href='${frontend_uri}/recover/${id}'>
        Click to create a new password for your account
      </a>
    `, 
    text: `Copy and paste this link: ${frontend_uri}/recover/${id}`
  })
  
}