const express = require("express");
const router = express.Router();
const { studentModel, mentorModel } = require('../config/dbConfig');



router.put('/assigningstudents', async (req, res) => {
    try {
        const mentorData = await mentorModel.findOne({ _id: req.body.mentorId })
        mentorData.studentAssined = [...mentorData.studentAssined, ...req.body.studentsID]
        mentorData.save();

        req.body.studentsID.forEach(async (studID) => {
            const student = await studentModel.findOne({ _id: studID });
            student.mentorAssined = req.body.mentorId;
            student.save();
        })
        res.status(200).send({
            message: "Students Assigned to particular Mentor",
            mentorData,
            studentModel
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
})

router.put('/modifyMentor', async (req, res) => {
    try {
        const student = await studentModel.findOne({ _id: req.body.studentID })

        const oldMentor = await mentorModel.findOne({_id:student.mentorAssined});
        // console.log(oldMentor)
        const  studentListOfoldMentor = oldMentor.studentAssined;
        // console.log(studentListOfoldMentor);
        if(studentListOfoldMentor.includes(req.body.studentID)){
            const index = studentListOfoldMentor.indexOf(req.body.studentID);
            // console.log(index)
            studentListOfoldMentor.splice(index,1);
            // console.log(studentListOfoldMentor)
            oldMentor.save();
        }

        if (student.mentorAssined.includes(oldMentor._id)) {
            const index  = student.mentorAssined.indexOf(oldMentor._id);
            console.log(index)
            student.mentorAssined.splice(index,1);
            student.mentorAssined.push(req.body.mentodID);
            console.log(student.mentorAssined);
        } else {
            student.mentorAssined = [...student.mentorAssined, req.body.mentodID];
        }
        student.save();

        const newMentor = await mentorModel.findOne({ _id: req.body.mentodID });
        newMentor.studentAssined = [...newMentor.studentAssined, req.body.studentID]
        newMentor.save();

        res.status(200).send({
            message: "Mentor Modified successfully",
            student,
            newMentor
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
})

module.exports = router;