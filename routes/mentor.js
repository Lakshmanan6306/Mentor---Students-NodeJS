const express = require("express");
const router = express.Router();
const {mentorModel,studentModel} = require('../config/dbConfig');

router.post('/newMentor', async (req, res) => {
    try {
        const id = req.body.id;
        const mentor = await mentorModel.findOne({ id: id });
        if (!mentor) {
            const data = req.body;
            await mentorModel.create(data);
            res.status(200).send({
                message: "new mentor added successfully",
                data: data
            })
        } else {
            res.status(400).send({
                message: "Id already Exists"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal Server error"
        })
    }
})

router.get('/getstudents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await mentorModel.findOne({ id: id });
        const value =data.studentAssined;
        var studentlist = [];
        for(var i=0;i<value.length;i++){
            let person = await studentModel.findOne({_id:value[i]})
            studentlist.push(person)
        }
        console.log(studentlist);

        res.status(200).send({
            message: "List of students for particular mentor",
            studentlist
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error
        })
    }
})


module.exports = router;