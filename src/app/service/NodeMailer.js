
const nodemailer = require("nodemailer");
const moment = require("moment");

class NodeMailer {
    sendMail = async(req,res) => {
        const {email,html} = req.body
        let transporter = nodemailer.createTransport({
           service : "gmail",
            auth: {
              user: 'reactnative868@gmail.com', // generated ethereal user
              pass: 'bumvzaeyfqgptggg', // generated ethereal password
            },
          });
          await transporter.sendMail({
            from: 'reactnative868@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Từ chủ trọ", // Subject line
            text: `Tiền trọ Ngày ${moment().format('DD-MM-YYYY')}`, // plain text body
            html: html, // html body
          },(err) => {
            if(err) { return res.json({message : "Lỗi",data:err})}
             return res.json({message : "Thành công"})
          });
    }
    sendMailService = async(data) => {
      const {email,html} = data
      let transporter = nodemailer.createTransport({
         service : "gmail",
          auth: {
            user: 'reactnative868@gmail.com', // generated ethereal user
            pass: 'bumvzaeyfqgptggg', // generated ethereal password
          },
        });
        await transporter.sendMail({
          from: 'reactnative868@gmail.com', // sender address
          to: email, // list of receivers
          subject: "Từ chủ trọ", // Subject line
          text: `Tiền trọ Ngày ${moment().format('DD-MM-YYYY')}`, // plain text body
          html: html, // html body
        },(err) => {
          if(err) { return {message : "Lỗi",data:err}}
           return {message : "Thành công"}
        });
  }
  sendMailChimp = async (req,res) => {
    
  }

    
  }
  module.exports = new NodeMailer();
  