
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
    findRoomForStudent = async({gender}) => {
      try {
       const allRoom = await room.find({people : {$elemMatch : {userId : {$exists : true}}}}).populate({path : 'people.userId',model : 'UserSchema'})
      //  let studentsNotGender = allRoom.filter(e => )
      let listNotGender = []
      let listGender = []
      allRoom.map(room => {
       const isRaw = room.people.some(user => user.userId.gender === gender)
        if(isRaw){
          listGender.push(room)
        }
        else{
          listNotGender.push(room)
        }
      })
       return {listNotGender,listGender}
      } catch (error) {
       throw new Error("Eoor")
      }
   }
    
  }
  module.exports = new RoomService();
  