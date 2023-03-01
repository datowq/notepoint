module.exports = {

  confirm: id => ({
    subject: 'NotePoint Email Adress Verification',
    html: `
      <a href='http://localhost:5173/verify/${id}'>
        Click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: http://localhost:5173/verify/${id}`
  }),

  recover: id => ({
    subject: 'Recover your NotePoint account', 
    html: `
      <a href='http://localhost:5173/recover/${id}'>
        Click to create a new password for your account
      </a>
    `, 
    text: `Copy and paste this link: http://localhost:5173/recover/${id}`
  })
  
}