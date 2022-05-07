const answerDb = require('./models/answers')
const questionDb = require('./models/questions')
const tagDb = require('./models/tags')
const userDb = require('./info/user.js')
const commentDb = require('./models/comments');

const mongodb = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017/fake_so"
mongodb.connect(mongourl)

const port = 8000;

const express = require("express")
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/tags', async (req, res) => {

    tagDb.find({},(err,resT) => {
        if(err) {
            res.send(err)
        }
        else
        {
            res.send(resT)
        }
    })
});

app.get('/answers', async (req, res) => {

    answerDb.find({},(err,resA) => {
        if(err) {
            res.send(err)
        }
        else
        {
            res.send(resA)
        }
    })
});

app.get('/questions', async (req, res) => {

    questionDb.find({},(err,resQ) => {
        if(err) {
            res.send(err)
        }
        else
        {
            resQ.reverse();
            res.send(resQ)
        }
    })
});

app.get('/users', async(req,res) => {
    userDb.find({},(err,resQ) => {
        if(err) {
            res.send(err)
        }
        else {
            res.send(resQ)
        }
    })
});

app.get('/comments', async(req,res) => {
    commentDb.find({},(err,resQ) => {
        if(err) {
            res.send(err)
        }
        else {
            res.send(resQ)
        }
    })
});

app.post('/addTag', async(req, res) => {
    try{
    let newTag = new tagDb({name: req.body.name});
    await newTag.save()
    res.json(newTag);
    }
    catch (error) {
        res.send(error);
    }
  })

app.post('/addQuestion', async(req, res) => {
    try{
    const {title, text, tags, answers, asked_by, ask_date_time, views} = req.body
    let newQuestion = new questionDb({title, text, tags, answers, asked_by, ask_date_time, views});
    res.send()
    await newQuestion.save()
    }
    catch (error) {
        res.send(error);
    }
})

app.post('/addAnswer', async(req, res) => {
    try {
    const {text, ans_by, ans_date_time} = req.body
    let newAnswer = new answerDb({text, ans_by, ans_date_time});
    // res.send()
    await newAnswer.save()
    }
    catch(error) {
        res.send(error);
    }
})  

app.post('/addUser', async(req,res) => {
    try{
    const {username, password, email, reputation,votedOn} = req.body;
    let newUser = new userDb({username, password, email, reputation,votedOn});
    newUser.password = newUser.createHash(newUser.password);
    await newUser.save();
    console.log(newUser)
    }
    catch(err) {
        console.log(err)
    }
});

app.post('/login', async (req, res) => {
    try{
        // console.log(req.body.email)
       await userDb.findOne({email: req.body.email}, function(err, user) {
        // console.log(user);
        // console.log(req.body.password)
        // console.log(user.password);
        // console.log(req.body);
        // console.log(req.body.password)
        if(req.body.password === null) {
            req.body.password = "";
        }
      if (!user.isValidPassword(req.body.password)) {
        res.status(400).json({error: "Invalid password"});
      } else {
        res.status(200).json({message: "Valid password"});
      }
    }).clone();
    }
    catch (err) {
        console.log(err)
    }
  });

app.put('/updateQuestion', async(req,res) => {
    
    const updateQuestion = req.body.upAns;
    const id = req.body.id
    // console.log(id._id);
    // console.log(questionDb.findById(id._id));
    // console.log(updateQuestion);
    try {
            await questionDb.findById(id._id, (error, questionToUpdate) => {
            questionToUpdate.answers.unshift(updateQuestion)
            questionToUpdate.views++;
            questionToUpdate.save();
            // console.log(error);
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");


    // let updateQuestion = new answerDb({text,ans_by,ans_date_time});
    // await updateQuestion.save();
})

app.put('/updateAnswerVoteUp', async(req,res) => {
    
    const updateAnswer = req.body.currA
    const currU = req.body.currU
    // console.log(id._id);
    // console.log(questionDb.findById(id._id));
    // console.log(updateQuestion);
    try {
            await answerDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            AnswerToUpdate.votes++;
            // console.log(AnswerToUpdate)
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
            // console.log(UserToUpdate)
            if(!UserToUpdate[0].votedOn.includes(updateAnswer._id)) {
                UserToUpdate[0].reputation+=5;
                UserToUpdate[0].votedOn.unshift(updateAnswer._id + "UP");
                UserToUpdate[0].save()
            }
            else if(UserToUpdate[0].votedOn.includes(updateAnswer._id + "DOWN")) {
                    UserToUpdate[0].reputation+=5;
                    for(let i = 0; i < UserToUpdate[0].votedOn.length; i++) {
                        if(UserToUpdate[0].votedOn[i] === updateAnswer._id) {
                            UserToUpdate[0].votedOn[i] = updateAnswer._id + "UP"
                        }
                    }
                    UserToUpdate[0].save()
            }
        }).clone();
    }
    catch(err) {
        console.log(err);
    }

    res.send("Updated");
})

app.put('/updateAnswerVoteDown', async(req,res) => {
    
    const updateAnswer = req.body
    const currU = req.body.currU
    // console.log(id._id);
    // console.log(questionDb.findById(id._id));
    // console.log(updateQuestion);
    try {
            await answerDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            console.log(AnswerToUpdate)
            AnswerToUpdate.votes--;
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
            // console.log(UserToUpdate)
            if(!UserToUpdate[0].votedOn.includes(updateAnswer._id)) {
                UserToUpdate[0].reputation-=10;
                UserToUpdate[0].votedOn.unshift(updateAnswer._id + "DOWN");
                UserToUpdate[0].save()
            }
            else if(UserToUpdate[0].votedOn.includes(updateAnswer._id + "UP")) {
                    UserToUpdate[0].reputation-=10;
                    for(let i = 0; i < UserToUpdate[0].votedOn.length; i++) {
                        if(UserToUpdate[0].votedOn[i] === updateAnswer._id) {
                            UserToUpdate[0].votedOn[i] = updateAnswer._id + "DOWN"
                        }
                    }
                    UserToUpdate[0].save()
            }
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})