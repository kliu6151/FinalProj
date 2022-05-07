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
      insideAQ: false
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

  handlerForHomePage() {
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
    })
  }
  /**
  Going into a specific question */
  handlerChangingSpecificQ (e, specQ) {
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
      insideAQ: true
    })
    // console.log(this.state.currQ);
  }
  /**
  Going into a specific answer
   */
  handlerChangingSpecificA (e) {
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
      // QorAorT: "Answers",
      // currTitle: specQ.title
    })
    // console.log(this.state.currQ);
  }

  handlerChangingSpecificT = (e, specT, tagModel) => {
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
    console.log(tagModel);
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
      QorAorT: "Questions"
    })
  }
  /**
   */
  handlerHidingForQForms() {
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

      })
  }
  /**
  Hiding certain components when we go into a question
   */
  handlerHidingForSpecQ() {
    this.setState({ 
      showhideQuestions: !this.state.showhideQuestions,
      showhideAnswers: !this.state.showhideAnswers,
      showhideTable: !this.state.showhideTable,
      showhideSearch: false,
      insideAQ: false,

      })
  }

  
  /**
   Handler for when we add a new question and updating the model
   */
  handlerModelUpdate = async (newQuestion) => {
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

    })
  }

  /**Handler for when we add a new answer to a question
   */
  handlerModelAUpdate = async (newAnswer) => {
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

    })
  }

  /** Handler for when the search bar is used
   */
  handlerForSearching = (res,curtit) => {
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
    })
  }
}

  handlerForTagPage() {
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
    })
  }

  handlerForLogInPage = () => {
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
      showhideGuestMode: false,
      insideAQ: false,

    })
  }

  handlerForSignUpPage = () => {
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
      showhideGuestMode: false,
      insideAQ: false,

    })
  }

  //I will have to test how the validation works and what happens when the user doesn't exist
  handlerForReturningUser = async (U) => {
    this.updatesInstantly();
    console.log(U)
    this.setState({
      currentUser: U,
      showhideLogIn: false,
      showhideQuestions: !this.state.showhideQuestions,
      showhideBanner: !this.state.showhideBanner,
      currLength: this.state.questions.length,
      showhideTable: true,
      insideAQ: false,

    })
  }

  handlerForRegister = async(newU) => {
    axios.post('http://localhost:8000/addUser', newU);
    this.updatesInstantly();
    //They would go to the homepage
    console.log("here");
    this.setState({
      // showhideQuestions: !this.state.showhideQuestions,
      showhideSignUp: !this.state.showhideSignUp,
      showhideLogIn: !this.state.showhideLogIn
    })
  }

  handlerForLoggingOut = () => {
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
      currUser: null,
      insideAQ: false,

    })
  }

  handlerForNextPage = (currPg) => {
    this.updatesInstantly();
    this.setState({
      currentPage: currPg
    })
  }

  handlerForPrevPage = (currPg) => {
    // this.updatesInstantly();
    this.setState({
      currentPage: currPg
    })
  }

  handlerForNextAnsPage = (currPg) => {
    this.updatesInstantly();
    this.setState({
      currentAnswerPage: currPg
    })
  }

  handlerForPrevAnsPage = (currPg) => {
    // this.updatesInstantly();
    this.setState({
      currentAnswerPage: currPg
    })
  }

  handlerForGuestMode = () => {
    this.setState({
      showhideGuestMode: true,
      currentUser: null,
      showhideLogIn: false,
      showhideQuestions: !this.state.showhideQuestions,
      showhideBanner: true,
      currLength: this.state.questions.length,
      showhideTable: true,
      showhideWelcome: !this.state.showhideWelcome
    })
  }

  handlerForAnswerVoteUp = (currentA) => {
    this.state.currentUser.reputation += 5;
    try {
    axios.put("http://localhost:8000/updateAnswerVoteUp", {currU: this.state.currentUser, currA: currentA}).then(() => {
      this.state.questions.map((val) => {
        if (val._id === this.state.currQ.id) {
          this.state.currQ.answers.map((specificA) => {
              return specificA._id === currentA._id ? {_id: specificA._id, text: specificA.text, ans_by: specificA.ans_by, ans_date_time: specificA.ans_date_time, votes: currentA.votes} : specificA 
          })
        }
      })
    });
    if(this.state.currentUser.votedOn.includes(currentA._id + "DOWN")) {
      for(let i = 0; i < this.state.currentUser.votedOn.length; i++) {
        if(this.state.currentUser.votedOn[i] === currentA._id + "DOWN") {
          this.state.currentUser.votedOn[i] = currentA._id + "UP"
        }
      }
    }  
    else {
      this.state.currentUser.votedOn.unshift(currentA._id + "UP");
    }  
  this.updatesInstantly()
    }
    catch(error) {
      console.log(error);
    }
  }

  handlerForAnswerVoteDown = (currentA) => {
    this.state.currentUser.reputation -= 10;
    try {
      axios.put("http://localhost:8000/updateAnswerVoteDown", currentA).then(() => {
        this.state.questions.map((val) => {
          if (val._id === this.state.currQ.id) {
            this.state.currQ.answers.map((specificA) => {
                return specificA._id === currentA._id ? {_id: specificA._id, text: specificA.text, ans_by: specificA.ans_by, ans_date_time: specificA.ans_date_time, votes: currentA.votes} : specificA 
            })
          }
        })
      });
      if(this.state.currentUser.votedOn.includes(currentA._id + "UP")) {
        for(let i = 0; i < this.state.currentUser.votedOn.length; i++) {
          if(this.state.currentUser.votedOn[i] === currentA._id + "UP") {
            this.state.currentUser.votedOn[i] = currentA._id + "DOWN"
          }
        }
      }
      else {
        this.state.currentUser.votedOn.unshift(currentA._id + "DOWN");
      }
      this.updatesInstantly()
      }
      catch(error) {
        console.log(error);
      }
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
        const { showhideBanner, showhideQuestionForm, showhideQuestions, showhideAnswerForm, showhideAnswers, showhideTags, showhideTable, showhideSearch, showhideTagSearch, showhideWelcome, showhideLogIn, showhideSignUp, showhideGuestMode } = this.state;
    // <Questions buttonClick={this.hideComp.bind(this,"showhideQuestions")} />
    return (
      <div>
        {showhideWelcome && <Welcome handlerForLogInPage = {this.handlerForLogInPage}
                                     handlerForSignUpPage = {this.handlerForSignUpPage}
                                     handlerForGuestMode = {this.handlerForGuestMode} />}

        {showhideLogIn && <LogIn dataU = {this.state.users} 
                                 handlerForReturningUser = {this.handlerForReturningUser}
                                 handlerForSignUpPage = {this.handlerForSignUpPage}
                                  /> }

        {showhideSignUp && <SignUp  dataU = {this.state.users}
                                    handlerForRegister = {this.handlerForRegister}
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
                 />}

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
                                      currPage = {this.state.currentAnswerPage}
                                      handlerForNextAnsPage = {this.handlerForNextAnsPage}
                                      currUser = {this.state.currentUser}
                                         handlerForPrevAnsPage = {this.handlerForPrevAnsPage}
                                         guestMode = {this.state.showhideGuestMode}
                                         handlerForAnswerVoteUp = {this.handlerForAnswerVoteUp}
                                         handlerForAnswerVoteDown = {this.handlerForAnswerVoteDown}
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



