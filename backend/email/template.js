const front = process.env.FRONT;

module.exports = {

  confirm: id => ({
    subject: 'NotePoint Email Adress Verification',
    html: `
      <a href='${front}/verify/${id}'>
        Click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${front}/verify/${id}`
  }),

  recover: id => ({
    subject: 'Recover your NotePoint account', 
    html: `
      <a href='${front}/recover/${id}'>
        Click to create a new password for your account
      </a>
    `, 
    text: `Copy and paste this link: ${front}/recover/${id}`
  })
  
}