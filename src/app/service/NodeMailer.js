
const nodemailer = require("nodemailer");

class NodeMailer {
    sendMail = async(req,res) => {
        const {email} = req.body
        let transporter = nodemailer.createTransport({
           service : "gmail",
            auth: {
              user: 'reactnative868@gmail.com', // generated ethereal user
              pass: 'chinhancut1', // generated ethereal password
            },
          });
          await transporter.sendMail({
            from: 'reactnative868@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          },(err) => {
            if(err) { return res.json({message : "Lỗi",data:err})}
             return res.json({message : "Thành công"})
          });
    }

    
  }
  module.exports = new NodeMailer();
  