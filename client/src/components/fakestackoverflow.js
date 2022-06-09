import React from 'react';
import Questions from './questions.js';
import TableCreate from './questionTableCreation.js';
import QuestionForm from './questionForm';
import InsideQ from './insideQuestion';
import AnswerForm from './answerForm';
import BannerSection from './banner';
import Tag from './tagPage';
import axios from 'axios';
import Welcome from "./welcome";
import LogIn from './logIn.js';
import SignUp from './signUp.js';
import UserProfile from './userProfile.js';


export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      tags: [],
      users: [],
      comments: [],
      showhideBanner: false,
      showhideQuestionForm: false,
      showhideQuestions: false,
      showhideAnswerForm: false,
      showhideAnswers: false,
      showhideTags: false,
      showhideTable: false,
      showhideSearch: false,
      showhideTagSearch: false,
      showhideWelcome: true,
      showhideLogIn: false,
      showhideSignUp: false,
      showhideGuestMode: false,
      showhideProfilePage: false,
      currentUser: null,
      currentPage: 1,
      currentAnswerPage: 1,
      searchingModel: [],
      tagModel: [],
      QorAorT: "Questions",
      currQ: null,
      currA: null,
      currTitle: "All Questions",
      currLength: 0,
      currVotes: 0,
      // searchingModel: mainModel,
      isQActive : true,
      isTActive : false,
      insideAQ: false,
      comRendered: false,
    };
        this.handlerHidingForQForms = this.handlerHidingForQForms.bind(this);
        this.handlerChangingSpecificQ = this.handlerChangingSpecificQ.bind(this);
        this.handlerChangingSpecificA = this.handlerChangingSpecificA.bind(this);
        this.handlerChangingSpecificT = this.handlerChangingSpecificT.bind(this);
        this.handlerForTagPage = this.handlerForTagPage.bind(this);
        this.handlerForHomePage = this.handlerForHomePage.bind(this);
        this.handlerForReturningUser = this.handlerForReturningUser.bind(this);

        this.handlerModelUpdate = this.handlerModelUpdate.bind(this);

        // this.hideComp = this.hideComp.bind(this);

  }

  handlerResetAnswers = async () => {
    for(let i = 0; i < this.state.answers; i++) {
      this.state.answers[i].comPage = 1;
    }
    await axios.put("http://localhost:8000/updateAnswerCommentPageReset").then(() => {
      this.state.answers.map((val) => {
        return  {_id: val._id, text: val.text, tags: val.tags, comments: val.comments, ans_by:val.ans_by, ans_date_time: val.ans_date_time, votes: val.votes, comPage: 1}
      })
    });
    this.setState({
      currentPage: 1,
      currentAnswerPage: 1,
    })
  }

  handlerForHomePage() {
    this.handlerResetAnswers();
    this.setState ({
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: true,
      showhideTable: true,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      QorAorT: "Questions",
      currTitle: "All Questions",
      currLength: this.state.questions.length,
      insideAQ: false,
      showhideProfilePage:false,

    })
  }
  /**
  Going into a specific question */
  handlerChangingSpecificQ (e, specQ) {
    this.handlerResetAnswers();
    this.setState({
      currQ: specQ,
      showhideAnswers: !this.state.showhideAnswers,
      showhideTable: false,
      showhideSearch: false,
      showhideTagSearch: false,
      QorAorT: "Answers",
      currTitle: specQ.title,
      currLength: specQ.answers.length,
      currVotes: specQ.votes,
      insideAQ: true,
      showhideProfilePage:false,

    })
    // console.log(this.state.currQ);
  }
  /**
  Going into a specific answer
   */
  handlerChangingSpecificA (e) {
    this.handlerResetAnswers()
    this.setState({
      showhideAnswers: false,
      showhideAnswerForm:true, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: false,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      currLength: 3,
      insideAQ: false,
      showhideProfilePage:false,

      // QorAorT: "Answers",
      // currTitle: specQ.title
    })
    // console.log(this.state.currQ);
  }

  handlerChangingSpecificT = (e, specT, tagModel) => {
    this.handlerResetAnswers();

    // console.log(this.state.model)
    let c = 0;
    for(let i = 0 ; i < this.state.questions.length; i++) {
        for(let j = 0; j < this.state.questions[i].tags.length; j++)
        {
          if(this.state.questions[i].tags[j].name === specT.name) {
            c++;
          }
        }
      
    }
    this.setState({
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: true,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: true,
      showhideSearch: false,
      tagModel: tagModel,
      currTitle: "Questions tagged" + "[" + specT.name + "]",
      currLength: c,
      QorAorT: "Questions",
      showhideProfilePage:false,

    })
  }
  /**
   */
  handlerHidingForQForms() {
    this.handlerResetAnswers();

    this.setState({ 
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: true,
      showhideSearch:false,
      showhideQuestions: false,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      QorAorT: "Questions",
      currTitle: "All Questions",
      insideAQ: false,
      showhideProfilePage:false,

      })
  }
  /**
  Hiding certain components when we go into a question
   */
  handlerHidingForSpecQ() {
    this.handlerResetAnswers();

    this.setState({ 
      showhideQuestions: !this.state.showhideQuestions,
      showhideAnswers: !this.state.showhideAnswers,
      showhideTable: !this.state.showhideTable,
      showhideSearch: false,
      insideAQ: false,
      showhideProfilePage:false,

      })
  }

  
  /**
   Handler for when we add a new question and updating the model
   */
  handlerModelUpdate = async (newQuestion) => {
    this.handlerResetAnswers();

    //Make a copy of model
    await axios.post('http://localhost:8000/addQuestion', newQuestion);
    this.updatesInstantly();
    this.setState({
      showhideQuestions: !this.state.showhideQuestions,
      currLength: this.state.questions.length,
      // showhideAnswers: !this.state.showhideAnswers,
      showhideTable: true,
      showhideQuestionForm: !this.state.showhideQuestionForm,
      insideAQ: false,
      showhideProfilePage:false,


    })
  }

  /**Handler for when we add a new answer to a question
   */
  handlerModelAUpdate = async (newAnswer) => {
    this.handlerResetAnswers();

    //Make a copy of model
    // let newModel = this.state.model
    let arrTemp = this.state.currQ.answers;
    arrTemp.unshift(newAnswer);
    try {
    axios.post("http://localhost:8000/addAnswer", newAnswer);    
    axios.put("http://localhost:8000/updateQuestion", { upAns: newAnswer, id: this.state.currQ}).then(() => {
      this.state.questions.map((val) => {
        return val._id == this.state.currQ.id ? {_id: val._id, title: val.title, text: val.text, tags: val.tags, answers: arrTemp, asked_by:val.asked_by, ask_date_time: val.ask_date_time, views: val.views} : val
      })
    });
    console.log("sadge");
    }
    catch(error) {
      console.log(error);
    }
    this.updatesInstantly();

    this.setState({
      showhideQuestions: !this.state.showhideQuestions,
      showhideAnswers: !this.state.showhideAnswers,
      currLength: this.state.currQ.answers.length,
      showhideAnswerForm: !this.state.showhideAnswerForm,
      insideAQ: false,
      showhideProfilePage:false,


    })
  }

  /** Handler for when the search bar is used
   */
  handlerForSearching = (res,curtit) => {
    this.handlerResetAnswers();

    if(curtit === "No Questions Found") {
      this.setState ({
        QorAorT: "Questions",
        currLength: 0,
        currTitle: curtit,      
        howhideAnswers: false,
        showhideAnswerForm:false, 
        showhideQuestionForm: false,
        showhideSearch:false,
        showhideQuestions: true,
        showhideTable: false,
        showhideTags: false,
        showhideTagSearch: false,
        showhideSearch: false,
        insideAQ: false,
      showhideProfilePage:false,

      })
    }
    else {
    this.setState({
      searchingModel: res,
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: true,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: true,   
      QorAorT: "Questions",
      currLength: res.length,
      currTitle: curtit,
      insideAQ: false,
      showhideProfilePage:false,

    })
  }
}

  handlerForTagPage() {
    this.handlerResetAnswers();

    this.setState({
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: true,
      showhideTable: false,
      showhideTags: true,
      showhideTagSearch: false,
      showhideSearch: false,
      currLength: this.state.tags.length,
      QorAorT: "Tags",
      currTitle: "All Tags",
      insideAQ: false,
      showhideProfilePage:false,

    })
  }

  handlerForLogInPage = () => {
    this.handlerResetAnswers();

    this.setState({
      showhideAnswers: false,
      showhideAnswerForm: false, 
      showhideQuestionForm: false,
      showhideSearch: false,
      showhideQuestions: false,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      showhideWelcome: false,
      showhideLogIn: true,
      showhideSignUp: false,
      showhideGuestMode: true,
      insideAQ: false,
      showhideProfilePage:false,


    })
  }

  handlerForSignUpPage = () => {
    this.handlerResetAnswers();

    this.setState({
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: false,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      showhideWelcome: false,
      showhideLogIn: false,
      showhideSignUp: true,
      showhideGuestMode: true,
      insideAQ: false,
      showhideProfilePage:false,


    })
  }

  //I will have to test how the validation works and what happens when the user doesn't exist
  handlerForReturningUser = async (U) => {
    this.handlerResetAnswers();

    this.updatesInstantly();
    console.log(U)
    this.setState({
      currentUser: U,
      showhideLogIn: false,
      showhideQuestions: true,
      showhideBanner: true,
      currLength: this.state.questions.length,
      showhideTable: true,
      insideAQ: false,
      showhideGuestMode: false,
      showhideProfilePage:false,
      guestMode: false,
      showhideWelcome: false

    })
  }

  handlerForRegister = async(newU) => {
    this.handlerResetAnswers();
    console.log(newU)
    axios.post('http://localhost:8000/addUser', newU);
    this.updatesInstantly();
    //They would go to the homepage
    console.log("here");
    this.setState({
      // showhideQuestions: !this.state.showhideQuestions,
      showhideSignUp: !this.state.showhideSignUp,
      showhideLogIn: !this.state.showhideLogIn,
      showhideGuestMode: false,
      showhideProfilePage:false,

    })
  }

  handlerForLoggingOut = () => {
    this.handlerResetAnswers();

    this.setState({
      showhideAnswers: false,
      showhideAnswerForm:false, 
      showhideQuestionForm: false,
      showhideSearch:false,
      showhideQuestions: false,
      showhideTable: false,
      showhideTags: false,
      showhideTagSearch: false,
      showhideSearch: false,
      showhideWelcome: true,
      showhideLogIn: false,
      showhideSignUp: false,
      showhideGuestMode: false,
      showhideBanner: false,
      currUser: null,
      insideAQ: false,
      showhideProfilePage:false,


    })
  }

  handlerForNextQComPage = () => {
    this.updatesInstantly();

  }

  handlerForPrevQComPage = () => {

    this.updatesInstantly();

  }

  handlerForNextAComPage = async (currA) => {
    try {
      await axios.put("http://localhost:8000/updateAnswerCommentPageUp", currA).then(() => {
        this.state.questions.map((val) => {
          return val._id == this.state.currQ.id ? {_id: val._id, text: val.text, tags: val.tags, comments: val.comments, ans_by:val.ans_by, ans_date_time: val.ans_date_time, votes: val.votes, comPage: currA.comPage} : val
        })
      });
      }
      catch(error) {
        console.log(error);
      }
    this.updatesInstantly();


  }

  handlerForPrevAComPage = async (currA) => {
    try {
      await axios.put("http://localhost:8000/updateAnswerCommentPageDown", currA).then(() => {
        this.state.questions.map((val) => {
          return val._id == this.state.currQ.id ? {_id: val._id, text: val.text, tags: val.tags, comments: val.comments, ans_by:val.ans_by, ans_date_time: val.ans_date_time, votes: val.votes, comPage: currA.comPage} : val
        })
      });
      }
      catch(error) {
        console.log(error);
      }
    this.updatesInstantly();

  }

  handlerForNextPage = (currPg) => {

    this.updatesInstantly();
    this.setState({
      currentPage: currPg
    })
  }

  handlerForPrevPage = (currPg) => {

    this.updatesInstantly();
    this.setState({
      currentPage: currPg
    })
  }

  handlerForNextAnsPage = (currPg) => {
    // this.handlerResetAnswers();

    this.updatesInstantly();
    this.setState({
      currentAnswerPage: currPg
    })
  }

  handlerForPrevAnsPage = (currPg) => {
    // this.handlerResetAnswers();

    this.updatesInstantly();
    this.setState({
      currentAnswerPage: currPg
    })
  }

  handlerForGuestMode = () => {
    this.handlerResetAnswers();

    this.setState({
      showhideGuestMode: true,
      currentUser: null,
      showhideLogIn: false,
      showhideQuestions: true,
      showhideBanner: true,
      currLength: this.state.questions.length,
      showhideTable: true,
      showhideWelcome: false,
      showhideProfilePage:false,

    })
  }

  handlerForAnswerVoteUp = (currentU,currentA) => {
    let t = this.state.users;
    let currU = t.find((e) => e.username === currentA.ans_by);
    console.log(currentU);
    currU.reputation += 5;
    try {
    axios.put("http://localhost:8000/updateAnswerVoteUp", {currU: currentU, currA: currentA}).then(() => {
      this.state.questions.map((val) => {
        if (val._id === this.state.currQ.id) {
          this.state.currQ.answers.map((specificA) => {
              return specificA._id === currentA._id ? {_id: specificA._id, text: specificA.text, ans_by: specificA.ans_by, ans_date_time: specificA.ans_date_time, votes: ++currentA.votes} : specificA 
          })
        }
      })
    });
    if(currentU.votedOn.includes(currentA._id + "DOWN")) {
      for(let i = 0; i < currentU.votedOn.length; i++) {
        if(currentU.votedOn[i] === currentA._id + "DOWN") {
          currentU.votedOn[i] = currentA._id + "UP"
        }
      }
    }  
    else {
      currentU.votedOn.unshift(currentA._id + "UP");
    }  
  this.updatesInstantly()
    }
    catch(error) {
      console.log(error);
    }
  }

  handlerForQuestionVoteUp = (currentU,currentQ) => {
    let t = this.state.users;
    let currU = t.find((e) => e.username === currentQ.asked_by);
    currU.reputation += 5;
    // console.log("WHAT")
    try {
    axios.put("http://localhost:8000/updateQuestionVoteUp", {currU: currentU, currQ: currentQ}).then(() => {
      this.state.questions.map((val) => {
        return val._id === currentQ._id ? {_id: val._id, title: val.title, text: val.text, tags: val.tags, answers: val.answers, asked_by:val.asked_by, ask_date_time: val.ask_date_time, views: ++currentQ.votes} : val
      })
    });
    if(currentU.votedOn.includes(currentQ._id + "DOWN")) {
      for(let i = 0; i < currentU.votedOn.length; i++) {
        if(currentU.votedOn[i] === currentQ._id + "DOWN") {
          currentU.votedOn[i] = currentQ._id + "UP"
        }
      }
    }  
    else {
      currentU.votedOn.unshift(currentQ._id + "UP");
    }  
    console.log(currentU)
    
  this.updatesInstantly()
    }
    catch(error) {
      console.log(error);
    }
  }

  handlerForAnswerVoteDown = (currentU,currentA) => {
    let t = this.state.users;
    let currU = t.find((e) => e.username === currentA.ans_by);
    currU.reputation -= 10;
    try {
      axios.put("http://localhost:8000/updateAnswerVoteDown", {currU: currentU, currA: currentA}).then(() => {
        this.state.questions.map((val) => {
          if (val._id === this.state.currQ.id) {
            this.state.currQ.answers.map((specificA) => {
                return specificA._id === currentA._id ? {_id: specificA._id, text: specificA.text, ans_by: specificA.ans_by, ans_date_time: specificA.ans_date_time, votes: --currentA.votes} : specificA 
            })
          }
        })
      });
      if(currentU.votedOn.includes(currentA._id + "UP")) {
        for(let i = 0; i < currentU.votedOn.length; i++) {
          if(currentU.votedOn[i] === currentA._id + "UP") {
            currentU.votedOn[i] = currentA._id + "DOWN"
          }
        }
      }
      else {
        currentU.votedOn.unshift(currentA._id + "DOWN");
      }
      this.updatesInstantly()
      }
      catch(error) {
        console.log(error);
      }
  }

  handlerForQuestionVoteDown = (currentU,currentQ) => {
    let t = this.state.users;
    let currU = t.find((e) => e.username === currentQ.asked_by);
    currU.reputation -= 10;
    try {
      axios.put("http://localhost:8000/updateQuestionVoteDown", {currU: currentU, currQ: currentQ}).then(() => {
      this.state.questions.map((val) => {
        return val._id === currentQ._id ? {_id: val._id, title: val.title, text: val.text, tags: val.tags, answers: val.answers, asked_by:val.asked_by, ask_date_time: val.ask_date_time, views: --currentQ.votes} : val
      })
    });
      if(currentU.votedOn.includes(currentQ._id + "UP")) {
        for(let i = 0; i < currentU.votedOn.length; i++) {
          if(currentU.votedOn[i] === currentQ._id + "UP") {
            currentU.votedOn[i] = currentQ._id + "DOWN"
          }
        }
      }
      else {
        currentU.votedOn.unshift(currentQ._id + "DOWN");
      }
      this.updatesInstantly()
      }
      catch(error) {
        console.log(error);
      }
  }

  handlerForQuestionComments = async (C) => {
    // console.log(C);
    let arrTemp = this.state.currQ.comments;
    console.log(this.state.currQ._id);
    arrTemp.unshift(C);
    console.log(this.state.currQ);
    try {
    axios.post("http://localhost:8000/addComment", C);    
    await axios.put("http://localhost:8000/updateQuestionComment", { upCom: C, id: this.state.currQ}).then(() => {
      this.state.questions.map((val) => {
        return val._id === this.state.currQ._id ? {_id: val._id, title: val.title, text: val.text, tags: val.tags, answers: val.answers, comments: arrTemp, asked_by:val.asked_by, ask_date_time: val.ask_date_time, views: val.views} : val
      })
    });
    console.log(C);
    }
    catch(error) {
      console.log(error);
    }
    this.updatesInstantly();
  
  }

  handlerForAnswerComments = async (C,currA) => {
    // console.log(C);
    let arrTemp = currA.comments;
    arrTemp.unshift(C);

    try {
    axios.post("http://localhost:8000/addComment", C);    
    await axios.put("http://localhost:8000/updateAnswerComment", { upCom: C, id: currA}).then(() => {
      this.state.answers.map((val) => {
        return val._id === currA._id ? {_id: val._id, text: val.text, comments: arrTemp, ans_by:val.ans_by, ans_date_time: val.ans_date_time, votes: val.votes, comPage: val.comPage} : val
      })
    });
    }
    catch(error) {
      console.log(error);
    }
    this.updatesInstantly();
  
  }

  handlerForLoggingIn = () => {
    this.setState({
      showhideQuestions: false,
      showhideTable: false,
      showhideWelcome: false,
      showhideSignUp: false,
      showhideLogIn: true,
      showhideProfilePage:false,
      showhideGuestMode:true
    })
  }

  handlerForProfilePage = () => {
    this.setState({
      showhideAnswers: false,
      showhideTable: false,
      showhideQuestions: false,
      showhideProfilePage: true,
      showhideTags: false,
      showhideSearch:false,
      showhideTagSearch: false
    })
  }

  handlerForWelcomePage = () => {
    this.setState({
      showhideLogIn: false,
      showhideSignUp: false,
      showhideWelcome: true,
    })
  }

  

  handleHideComp(name) {
    switch (name) {
      case "showhideBanner":
        this.setState({ showhideBanner: !this.state.showhideBanner });
        break;
      case "showhideQuestionForm":
        this.setState({ showhideQuestionForm: !this.state.showhideQuestionForm });
        break;
      case "showhideQuestions":
        this.setState({ showhideQuestions: !this.state.showhideQuestions });
        break;
      case "showhideAnswerForm":
        this.setState({ showhideAnswerForm: !this.state.showhideAnswerForm });
        break;
      case "showhideAnswers":
        this.setState({ showhideAnswers: !this.state.showhideAnswers });
        break;
      case "showhideTags":
        this.setState({ showhideTags: !this.state.showhideTags });
        break;
      case "showhideTable":
        this.setState({ showhideTags: !this.state.showhideTable });
        break;
    }
  }
  async componentDidMount() {
    this.updatesInstantly()
      
  }
  updatesInstantly = async () => {
    await axios.get('http://localhost:8000/questions')
    .then(res => {
      this.setState({questions: res.data});
    })
    await axios.get('http://localhost:8000/tags')
    .then(res => {
      this.setState({tags: res.data});
    })
    await axios.get('http://localhost:8000/answers')
    .then(res => {
      this.setState({answers: res.data});
    })
    await axios.get('http://localhost:8000/users')
    .then(res => {
      this.setState({users: res.data});
    })
    await axios.get('http://localhost:8000/comments')
    .then(res => {
      this.setState({comments: res.data});
    })
  }
  render() {
        const { showhideBanner, showhideQuestionForm, showhideQuestions, showhideAnswerForm, showhideAnswers, showhideTags, showhideTable, showhideSearch, showhideTagSearch, showhideWelcome, showhideLogIn, showhideSignUp, showhideProfilePage } = this.state;
    // <Questions buttonClick={this.hideComp.bind(this,"showhideQuestions")} />
    return (
      <div>
        {showhideWelcome && <Welcome handlerForLogInPage = {this.handlerForLogInPage}
                                     handlerForSignUpPage = {this.handlerForSignUpPage}
                                     handlerForGuestMode = {this.handlerForGuestMode} />}

        {showhideLogIn && <LogIn dataU = {this.state.users} 
                                 handlerForReturningUser = {this.handlerForReturningUser}
                                 handlerForSignUpPage = {this.handlerForSignUpPage}
                                 handlerForGuestMode = {this.handlerForGuestMode}
                                handlerForWelcome = {this.handlerForWelcomePage}
                                  /> }

        {showhideSignUp && <SignUp  dataU = {this.state.users}
                                    handlerForRegister = {this.handlerForRegister}
                                    handlerForWelcome = {this.handlerForWelcomePage}
                                    />}
        {showhideBanner && <BannerSection 
         dataQ = {this.state.questions}
         dataT = {this.state.tags}
         currUser = {this.state.currentUser}
         guestMode = {this.state.showhideGuestMode}
                handlerForSearching = {this.handlerForSearching }
                handlerForTagPage = {this.handlerForTagPage}
                handlerForHomePage = {this.handlerForHomePage}
                handlerForLoggingOut = {this.handlerForLoggingOut}
                handlerForLoggingIn = {this.handlerForLoggingIn}
                handlerForProfilePage = {this.handlerForProfilePage}
                 />}

        {showhideProfilePage && <UserProfile  currUser = {this.state.currentUser}
                                              tagData={this.state.tags} 
                                              questionData={this.state.questions}
                                              answerData={this.state.answers}
                                              commentData={this.state.comments}
                                              currPage = {this.state.currentPage}
                                              handlerHidingForQForms = {this.handlerHidingForQForms} 
                                              handlerChangingSpecificQ = {this.handlerChangingSpecificQ}
                                              handlerForNextPage = {this.handlerForNextPage}
                                              handlerForPrevPage = {this.handlerForPrevPage}
                                              updatesInstantly = {this.updatesInstantly}/>}
        

        {showhideQuestions && <Questions handlerHidingForQForms = {this.handlerHidingForQForms}
                                         numQuestions = {this.state.currLength}
                                         sectionType = {this.state.QorAorT}
                                         titleQuestions = {this.state.currTitle} 
                                         guestMode = {this.state.showhideGuestMode}
                                         currVotes = {this.state.currVotes}
                                         insideAQ = {this.state.insideAQ} />}
        {showhideQuestionForm && <QuestionForm handlerModelUpdate = {this.handlerModelUpdate} 
                                               currUser = {this.state.currentUser}
                                                modelTags= {this.state.tags}
                                                numQuestions = {this.state.questions.length} />}
        {showhideTable && <TableCreate tagData={this.state.tags} 
                                        questionData={this.state.questions}
                                        commentData={this.state.comments}
                                        currPage = {this.state.currentPage}
                                         handlerHidingForQForms = {this.handlerHidingForQForms} 
                                         handlerChangingSpecificQ = {this.handlerChangingSpecificQ}
                                         handlerForNextPage = {this.handlerForNextPage}
                                         handlerForPrevPage = {this.handlerForPrevPage} />}
        {showhideSearch && <TableCreate tagData = {this.state.tags}
                                        questionData={this.state.searchingModel} 
                                        commentData={this.state.comments}
                                        currPage = {this.state.currentPage}
                                          handlerHidingForQForms = {this.handlerHidingForQForms} 
                                         handlerChangingSpecificQ = {this.handlerChangingSpecificQ} 
                                         handlerForNextPage = {this.handlerForNextPage}
                                         handlerForPrevPage = {this.handlerForPrevPage} />}
        {showhideTagSearch && <TableCreate questionData = {this.state.tagModel} 
                                           tagData = {this.state.tags}
                                         commentData={this.state.comments}
                                           currPage = {this.state.currentPage}
                                          handlerHidingForQForms = {this.handlerHidingForQForms} 
                                         handlerChangingSpecificQ = {this.handlerChangingSpecificQ}
                                         handlerForNextPage = {this.handlerForNextPage}
                                         handlerForPrevPage = {this.handlerForPrevPage} />}
        {showhideAnswers && <InsideQ specificQ = {this.state.currQ} 
                                      handlerChangingSpecificA = {this.handlerChangingSpecificA}
                                      answerData = {this.state.answers}
                                      tagData={this.state.tags}
                                      commentData = {this.state.comments}
                                      userData = {this.state.users}
                                      currPage = {this.state.currentAnswerPage}
                                      handlerForNextAnsPage = {this.handlerForNextAnsPage}
                                      currUser = {this.state.currentUser}
                                      comRendered = {this.state.comRendered}
                                         handlerForPrevAnsPage = {this.handlerForPrevAnsPage}
                                         guestMode = {this.state.showhideGuestMode}
                                         handlerForAnswerVoteUp = {this.handlerForAnswerVoteUp}
                                         handlerForAnswerVoteDown = {this.handlerForAnswerVoteDown}
                                         handlerForQuestionVoteUp = {this.handlerForQuestionVoteUp}
                                         handlerForQuestionVoteDown = {this.handlerForQuestionVoteDown}
                                         handlerForQuestionComments = {this.handlerForQuestionComments}
                                         handlerForPrevQComPage = {this.handlerForPrevQComPage}
                                         handlerForNextQComPage = {this.handlerForNextQComPage}
                                         handlerForAnswerComments = {this.handlerForAnswerComments}
                                         handlerForNextAComPage = {this.handlerForNextAComPage}
                                         handlerForPrevAComPage = {this.handlerForPrevAComPage}
                                       />}
        {showhideAnswerForm && <AnswerForm specificQ = {this.state.currQ}
                                            handlerModelAUpdate = {this.handlerModelAUpdate}
                                            currUser = {this.state.currentUser}  />}
        {showhideTags && <Tag  tagDataQ = {this.state.questions} 
                               tagDataT = {this.state.tags}
                                handlerChangingSpecificT = {this.handlerChangingSpecificT} /> }
      </div>
    )
  }
}



