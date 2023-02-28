module.exports = {

  confirm: id => ({
    subject: 'NotePoint Email Adress Verification',
    html: `
      <a href='http://localhost:5173/verify/${id}'>
        Click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: http://localhost:5173/verify/${id}`
  })
  
}