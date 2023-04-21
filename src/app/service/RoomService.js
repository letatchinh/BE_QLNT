
const moment = require("moment");
const { Types } = require("mongoose");
const room = require("../models/room");
const UserSchema = require("../models/user");
class RoomService {
    getById = async(id) => {
       try {
        const findOneRoom = await room.findById(id).populate({
          path : 'people.userId',
          model : 'UserSchema'
        }).populate({
          path : 'idBrem',
          model :'BremSchema'
        })
        return findOneRoom
       } catch (error) {
        
       }
    }
    findStudentForRoom = async() => {
       try {
        const allRoom = await room.find()
        let students = []
        allRoom.map(e => e.people.map(user => students.push(user.userId)
          )
        )
        const listStudents = await UserSchema.find({_id : {$nin : students}})
        return listStudents
       } catch (error) {
        throw new Error("Eoor")
       }
    }
    findRoomForStudent = async(data) => {
      try {
       const allRoom = await room.find({people : {$elemMatch : {userId : {$exists : true}}}}).populate({path : 'people.userId',model : 'UserSchema'}).populate({path : 'idGroupRoom',model : 'GroupRoomSchema'})
      const listKey = ['countryside','branch','hobbys']
      let result = {}
      let listNotGender = []
      let listGender = []
      allRoom.map(room => {
       if(room.maxUser > room.people.length){
        const isRaw = room.people.some(user => user.userId.gender === data.gender)
        if(isRaw){
          listGender.push(room)

        }
        else{
          listNotGender.push(room)
        }
       }
      })
      listGender.length > 0 && listGender?.map(item => {
        let count = 0
        let keySame = []
        item.people.map(e => {
          listKey.map(key => {
            switch (key) {
              case 'hobbys':
                if(e.userId.hobbys.length > 0 && data.hobbys.length > 0){
                  const findOne = data.hobbys.find(hobby => e.userId.hobbys.some(f => f === hobby._id))
                  if(findOne) {
                    count++
                    keySame.push({type:key,data:findOne})
                  }
                }
                break;
              default:
                if(e.userId[key] === data[key]) {
                  count++
                  keySame.push({type:key,data:data[key]})
                }
                break;
            }
           
          })
        })
        const submitResult = {...item._doc,keySame}
        if(!result[count]){
          result[count] = [submitResult]
        }
        else{
          result[count].push(submitResult)
        }
      })
      let dataResult = []
for (const [key, value] of Object.entries(result)) {
    dataResult.push({count : key,value})
  }

  dataResult.sort((a,b) => parseInt(b.count) - parseInt(a.count))
       return {listNotGender : [{count : 0,value : listNotGender}],listGender,result:dataResult}
      } catch (error) {
       throw new Error("Eoor")
      }
   }
    
  }
  module.exports = new RoomService();
  