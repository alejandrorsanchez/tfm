const emailController = {};
const nodemailer = require('nodemailer');

emailController.send = (req, res) => {
    const email = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aleeexr7@gmail.com',
            pass: 'aspire5920g'
        }
    });
    const mailOptions = {
        from: email.senderName,
        to: email.receiverEmail,
        subject: 'MasMascotas: Nuevos mensajes',
        html: `
         <strong>MasMascotas</strong><br/>
         ${email.senderName} te ha enviado un nuevo mensaje. 
        `
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) throw err;
        res.status(200).json({message: 'Notificación enviada al destinatario'});
    });
}

module.exports = emailController;
