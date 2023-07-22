const mongoose = require('mongoose');
const validator = require('validator');
const collection = 'mentordata'
const dbUrl = `mongodb+srv://Lakshmanan:Selva123@cluster0.khnpx6n.mongodb.net/${collection}`

mongoose.connect(dbUrl);

//schema for mentor 


const newMentor = new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String, required:true},
    experience :{type:String},
    subject:{type:String},
    studentAssined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default:null,
            ref:"studentModel"
        }
    ]
})

const newStudent = new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String, required:true},
    email:{type:String, validator:(value)=>{
        return validator.isEmail(value)
    }},
    mentorAssined: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default:null,
            ref:"mentorModel"
        }
    ]
})

const studentModel = mongoose.model('student',newStudent)

const mentorModel = mongoose.model('mentor',newMentor)

module.exports = {mentorModel,studentModel};