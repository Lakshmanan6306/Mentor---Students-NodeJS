const express = require("express");
const { mentorModel, studentModel } = require('./config/dbConfig');

const mentorRouter = require('./routes/mentor');
const studentRouter = require('./routes/student');
const modifyRouter = require('./routes/assingstudentsTomentor');


const app = express();
const PORT = 8080;
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const mentor = await mentorModel.find();
        const student = await studentModel.find();
        res.status(200).send({
            message: "App is working in 8080 PORT",
            mentor: mentor,
            student: student
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server error"
        })
    }
})

// Write API to create Mentor
//Write API to show all students for a particular mentor
app.use('/mentor',mentorRouter);

// Write API to create Student
app.use('/student',studentRouter);

// Select one mentor and Add multiple Student
// Write API to Assign or Change Mentor for particular Student
app.use('/modify',modifyRouter);





app.listen(PORT, () => console.log('App is Listening in 8080 PORT'))