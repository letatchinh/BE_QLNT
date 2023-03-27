const roomRoute = require('./room')
const bremRoute = require('./brem')
const userRoute = require('./user')
const billRoute = require('./bill')
function route(app){
 app.use('/room',roomRoute)
 app.use('/brem',bremRoute)
 app.use('/user',userRoute)
 app.use('/bill',billRoute)
}
module.exports = route