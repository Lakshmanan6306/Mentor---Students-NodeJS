const express = require('express');
const router = express.Router();
const {studentModel} = require('../config/dbConfig');



router.post('/newStudent', async (req, res) => {
    try {
        const email = req.body.email;
        const studentData = await studentModel.findOne({ email: email });
        if (!studentData) {
            const student = req.body;
            const all = await studentModel.create(student)
            res.status(200).send({
                message: "New Student Added",
                data: all
            })
        } else {
            res.status(400).send({
                message: "Student Already Exists. Try with new email "
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})


module.exports = router;