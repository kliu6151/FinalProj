const mongodb = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017/fake_so"
mongodb.connect(mongourl)


const answerDb = require('./models/answers')
const questionDb = require('./models/questions')
const tagDb = require('./models/tags')
const userDb = require('./info/user.js')
const commentDb = require('./models/comments');

const port = 8000;

const express = require("express")
const cors = require('cors');

const app = express()
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


var admin = new userDb();
admin.username = 'admin';
admin.email = 'admin@admin.com';
admin.password = admin.createHash('admin');
admin.reputation = 100;
admin.save();


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
        const {name, createdBy} = req.body
    let newTag = new tagDb({name, createdBy});
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
    await newAnswer.save()
    }
    catch(error) {
        res.send(error);
    }
})  

app.post('/addUser', async(req,res) => {
    try{
    const {username, password, email, reputation, votedOn, createdOn} = req.body;
    let newUser = new userDb({username, password, email, reputation, votedOn, createdOn});
    newUser.password = newUser.createHash(newUser.password);
    await newUser.save();
    }
    catch(err) {
        console.log(err)
    }
});

app.post('/addComment', async(req,res) => {
    try{
    const {text, ans_by, ans_date_time} = req.body;
    let newComment = new commentDb({text, ans_by, ans_date_time});
    await newComment.save();
    }
    catch(err) {
        console.log(err)
    }
});

app.post('/login', async (req, res) => {
    try{
       await userDb.findOne({email: req.body.email}, function(err, user) {
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

    try {
            await questionDb.findById(id._id, (error, questionToUpdate) => {
            questionToUpdate.answers.unshift(updateQuestion)
            questionToUpdate.views++;
            questionToUpdate.save();
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put('/updateQuestionComment', async(req,res) => {
    
    const updateQuestion = req.body.upCom;
    const id = req.body.id
    try {
            await questionDb.findById(id._id, (error, questionToUpdate) => {
            questionToUpdate.comments.unshift(updateQuestion)
            questionToUpdate.markModified('comments')
            questionToUpdate.save();
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put('/updateAnswerComment', async(req,res) => {
    
    const updateQuestion = req.body.upCom;
    const id = req.body.id
    try {
            await answerDb.findById(id._id, (error, questionToUpdate) => {
            questionToUpdate.comments.unshift(updateQuestion)
            questionToUpdate.markModified('comments')
            questionToUpdate.save();
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put('/updateAnswerCommentPageUp', async(req,res) => {
    try {
            await answerDb.findById(req.body._id, (error, answerToUpdate) => {
            answerToUpdate.comPage = req.body.comPage + 1
            answerToUpdate.markModified('commPage')
            answerToUpdate.save();
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})
app.put('/updateAnswerCommentPageDown', async(req,res) => {

    try {
            await answerDb.findById(req.body._id, (error, answerToUpdate) => {
            answerToUpdate.comPage = req.body.comPage - 1
            answerToUpdate.markModified('commPage')
            answerToUpdate.save();
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put('/updateAnswerCommentPageReset', async(req,res) => {

    try {
            await answerDb.find({}, (error, answerToUpdate) => {
                for(let i = 0; i < answerToUpdate.length; i++) {
                    answerToUpdate[i].comPage = 1
                    answerToUpdate[i].save();
                }
            
        }).clone();
    }
    catch(err) {
        console.log(err);
    }
    res.send("Updated");
})

app.put('/updateAnswerVoteUp', async(req,res) => {
    
    const updateAnswer = req.body.currA
    const currU = req.body.currU

    try {
            await answerDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            AnswerToUpdate.votes++;
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
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

app.put('/updateQuestionVoteUp', async(req,res) => {
    
    const updateAnswer = req.body.currQ
    const currU = req.body.currU

    try {
            await questionDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            AnswerToUpdate.votes++;
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
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
    
    const updateAnswer = req.body.currA
    const currU = req.body.currU

    try {
            await answerDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            AnswerToUpdate.votes--;
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
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

app.put('/updateQuestionVoteDown', async(req,res) => {
    
    const updateAnswer = req.body.currQ
    const currU = req.body.currU

    try {
            await questionDb.findById(updateAnswer._id, (error, AnswerToUpdate) => {
            AnswerToUpdate.votes--;
            AnswerToUpdate.save();
        }).clone();
        await userDb.find( {username: currU.username}, (error, UserToUpdate) => {
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
