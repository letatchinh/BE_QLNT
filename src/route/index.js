const roomRoute = require('./room')
const bremRoute = require('./brem')
const userRoute = require('./user')
const billRoute = require('./bill')
const meterRoute = require('./meter')
const nodeMailerRoute = require('./nodeMailer')
function route(app){
 app.use('/room',roomRoute)
 app.use('/brem',bremRoute)
 app.use('/user',userRoute)
 app.use('/bill',billRoute)
 app.use('/meter',meterRoute)
 app.use('/nodeMailer',nodeMailerRoute)
}
module.exports = route