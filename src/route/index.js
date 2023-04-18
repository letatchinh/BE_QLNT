const roomRoute = require('./room')
const bremRoute = require('./brem')
const userRoute = require('./user')
const billRoute = require('./bill')
const meterRoute = require('./meter')
const nodeMailerRoute = require('./nodeMailer')
const hobby = require('./hobby')
const account = require('./account')
function route(app){
 app.use('/room',roomRoute)
 app.use('/brem',bremRoute)
 app.use('/user',userRoute)
 app.use('/bill',billRoute)
 app.use('/meter',meterRoute)
 app.use('/nodeMailer',nodeMailerRoute)
 app.use('/hobby',hobby)
 app.use('/account',account)
}
module.exports = route