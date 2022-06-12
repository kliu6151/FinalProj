import styles from './insideQuestion.module.css'
import React from 'react';

class InsideQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currQPage: 1
        }

    }


    clickSpecA = (e) => {
        this.props.handlerChangingSpecificA(e)
    }

    renderNextPage = (e) => {
        e.preventDefault();
        let z = this.props.currPage;
        z += 1;
        var quest = this.props.specificQ;
        var ans = this.props.answerData;
        console.log(this.generateAnswers(quest.answers,ans).slice((z-1)*5, (z * 5)))
        if(this.generateAnswers(quest.answers,ans).slice((z-1)*5, (z * 5)).length !== 0) {
            // console.log("HUHUUH");
            this.props.handlerForNextAnsPage(z);
        }
    }

    renderPrevPage = (e) => {
        e.preventDefault();
        let z = this.props.currPage;
        z -= 1;
        if(z !== 0) {
            this.props.handlerForPrevAnsPage(z)
        }
    }

    handlerForAnswerVoteUp = (event,currA) => {
        event.preventDefault();
        let t = this.props.userData;
        let currU = t.find((e) => e.username === currA.ans_by);
        console.log(currU)
        if(this.props.currUser.reputation >= 100) {
            if(!this.props.currUser.votedOn.includes(currA._id + "UP"))
            {
                    this.props.handlerForAnswerVoteUp(this.props.currUser,currA)
            }
        }

    }

    handlerForAnswerVoteDown = (event,currA) => {
        event.preventDefault();
        let t = this.props.userData;
        let currU = t.find((e) => e.username === currA.ans_by);
        // console.log(currU)
        if(this.props.currUser.reputation >= 100) {
            if(!this.props.currUser.votedOn.includes(currA._id + "DOWN"))
                {
                    this.props.handlerForAnswerVoteDown(this.props.currUser,currA)
                }

        }
    }

    handlerForQuestionVoteUp = (event,currQ) => {
        event.preventDefault();
        let t = this.props.userData;
        let currU = t.find((e) => e.username === currQ.asked_by);
        console.log(currU)
        if(!this.props.currUser.votedOn.includes(currQ._id + "UP"))
            {
                console.log("HI")
                this.props.handlerForQuestionVoteUp(this.props.currUser,currQ)
            }
    }

    handlerForQuestionVoteDown = (event,currQ) => {
        event.preventDefault();
        let t = this.props.userData;
        let currU = t.find((e) => e.username === currQ.asked_by);
        console.log(currU)
        if(!this.props.currUser.votedOn.includes(currQ._id + "DOWN"))
        {
                this.props.handlerForQuestionVoteDown(this.props.currUser,currQ)

        }
    }

    onEnterCommentQuestion = (event,quest) => {
        if(event.charCode === 13)
        {
            event.preventDefault();
            let t = event.target.value;
            let C = {
                text: t,
                ans_by: this.props.currUser.username,
            }
            this.props.handlerForQuestionComments(C);
        }
    }

    onEnterCommentAnswer = (event, currA) => {
        if(event.charCode === 13)
        {
            // this.handlerForComRenderedF();
            console.log(currA);
            event.preventDefault();
            let t = event.target.value;
            console.log(t)
            let C = {
                text: t,
                ans_by: this.props.currUser.username,
            }
            // console.log(C)
            // this.props.specificQ.comments.unshift(C);
            this.props.handlerForAnswerComments(C,currA);
            // this.handlerForComRenderedT();
        }
    }

    renderNextQComPage = (e) => {
        e.preventDefault();
        let z = this.props.specificQ.comPage;
        z += 1;
        var quest = this.props.specificQ.comments;
        if(quest.slice((z-1)*3, (z * 3)).length !== 0) {
            this.props.specificQ.comPage +=1
            this.props.handlerForNextQComPage();
        }
    }

    renderPrevQComPage = (e) => {
        e.preventDefault();
        // let z = this.state.currPage;
        let z = this.props.specificQ.comPage;
        z -= 1;
        if(z !== 0) {
            this.props.specificQ.comPage -=1
            this.props.handlerForPrevQComPage()
        }
    }

    renderNextAComPage = (event,currA) => {
        event.preventDefault();
        // let z = this.state.currQPage;
        // console.log(this.props.specificQ.comPage);
        let z = currA.comPage;
        z += 1;
        var quest = currA.comments;
        console.log(z)
        if(quest.slice((z-1)*3, (z * 3)).length !== 0) {
            // currA.comPage +=1
            this.props.handlerForNextAComPage(currA);
        }
    }

    renderPrevAComPage = (event,currA) => {
        event.preventDefault();

        // let z = this.state.currPage;
        let z = currA.comPage;
        z -= 1;
        if(z !== 0) {
            // currA.comPage -=1
            this.props.handlerForPrevAComPage(currA)
        }
    }

    render() {
    var quest = this.props.specificQ;
    var ans = this.props.answerData;
    var tag = this.props.tagData;
    var com = this.props.commentData;
    
    // console.log(quest.comments.length)
    return (
        <>
        <table className = {styles.wholeAnswerTable}>
            <tbody>
                <tr>
                    <td className = {styles.firstCol}>
                        {++quest.views} Views
                        <br />
                        <br />
                        <div onClick = {(e) => {this.handlerForQuestionVoteUp(e,quest)}} id = {!this.props.guestMode ? null : styles["invis"]}>&#x2191;</div>
                        Votes: {quest.votes}
                        <div onClick = {(e) => {this.handlerForQuestionVoteDown(e,quest)}} id = {!this.props.guestMode ? null : styles["invis"]}>&#x2193;</div>
                    </td>
                    <td className = {styles.secondCol}>
                        {quest.text}
                        <br />
                        <br />
                        <br />
                        <table>
                            {this.generateTags(quest,tag).map((name)=>(
                            <td className = {styles.questionsTag}>{name}</td>
                            ))}
                        </table>
                        <br />
                            {}
                            {this.generateAnswers(quest.comments,com).slice((quest.comPage-1)*3, (quest.comPage * 3)).map((name) => (
                            <>
                                <div className = {styles.comText}>
                                    {name.text}
                                        <span className = {styles.comBy}>
                                            Ans By {name.ans_by} 
                                        </span>
                                </div>
                            {/* </tr> */}
                            </>
                            ))}
                            {/* {console.log(Math.ceil(quest.comments.length / 3))} */}
                            {console.log()}
                        <button id = {quest.comments.length === 0 ? styles["invis"] : (quest.comPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])} onClick = {this.renderPrevQComPage}>&#x2190;</button>
                        <button id = {quest.comments.length === 0 ? styles["invis"] : (quest.comments.length !== 0 && Math.ceil(quest.comments.length / 3) !== quest.comPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {this.renderNextQComPage}>&#x2192;</button>
                         
                        <br />
                            {!this.props.guestMode ? <input type = "text" id = {styles["commentInput"]} onKeyPress = {(e) => {this.onEnterCommentQuestion(e,quest)}} name = "Comment" /> : null }
                        <br />
                    </td>
                    <td className = {styles.thirdCol}>
                        <span className = {styles.ansBy}>
                        Asked By {quest.asked_by}
                        </span>
                        <br />
                        <span className = {styles.ansOn}>
                        On {this.generateDate(quest.ask_date_time)}
                        </span>
                        <br />
                        <span className = {styles.ansAt}>
                        At {this.generateTime(quest.ask_date_time)}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
             <hr id = {styles["horiLine"]}/>
        <table className = { styles.wholeAnswerTable}>
            <tbody>
                {/* <tr> */}
                    {this.generateAnswers(quest.answers,ans).slice((this.props.currPage-1)*5, (this.props.currPage * 5)).map((name)=>(
                        <>
                        <tr>
                            <td className= {styles.firstColA}>
                                <div onClick = {(e) => {this.handlerForAnswerVoteUp(e,name)}} id = {!this.props.guestMode ? null : styles["invis"]}>&#x2191;</div>
                                <span >Votes: {name.votes}</span>
                                <div onClick = {(e) => {this.handlerForAnswerVoteDown(e,name)}} id = {!this.props.guestMode ? null : styles["invis"]}>&#x2193;</div>
                            </td>
                            <td className = {styles.answerText}>
                                {name.text}
                                <br />
                                <br />
                                <br />
                                {this.generateAnswers(name.comments,com).slice((name.comPage-1)*3, (name.comPage * 3)).map((name) => (
                                    <>
                                    <div className = {styles.comText}>
                                        {name.text}
                                            <span className = {styles.comBy}>
                                                Ans By {name.ans_by} 
                                            </span>
                                    </div>
                                    </>
                                ))}
                                <br />
                                <button id = {name.comments.length === 0 ? styles["invis"] : (name.comPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])} onClick = {(e) => {this.renderPrevAComPage(e,name)}}>&#x2190;</button>
                                <button id = {name.comments.length === 0 ? styles["invis"] : (name.comments.length !== 0 && Math.ceil(name.comments.length / 3) !== name.comPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {(e) => {this.renderNextAComPage(e,name)}}>&#x2192;</button>
                                <br />
                                    {!this.props.guestMode ? <input type = "text" id = {styles["commentInput"]} onKeyPress = {(e) => {this.onEnterCommentAnswer(e,name)}} name = "Comment" /> : null}
                                <br />

                            </td>
                            <td className = {styles.thirdCol}>
                                <span className = {styles.ansBy}>
                                Ans By {name.ans_by} 
                                </span>
                                <br />
                                <span className = {styles.ansOn}>
                                On {this.generateDate(name.ans_date_time)} 
                                </span>
                                <br />
                                <span className = {styles.ansAt}>
                                At {this.generateTime(name.ans_date_time)} 
                                </span>
                            </td>
                        </tr>
                        <hr id = {styles["horiLine"]}/>

                        </>

                    ))}

                {/* </tr> */}
            </tbody>
        </table>
        <button id = {quest.answers.length === 0 ? styles["invis"] : (this.props.currPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])} onClick = {this.renderPrevPage}>&#x2190;</button>
        <button id = {quest.answers.length === 0 ? styles["invis"] : (quest.answers.length !== 0 && Math.ceil(quest.answers.length / 5) !== this.props.currPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {this.renderNextPage}>&#x2192;</button>
            {!this.props.guestMode ? 
                  <div id = {styles["answerButtonContainer"]} > 
                    <button id = {styles["answerButton"]} onClick={(e) => this.clickSpecA(e)}>
                        Answer Question
                    </button> 
                </div>
            : null}

        </>
    );
}

generateDate = (curDate) => {
    const d1 = new Date(curDate).toLocaleDateString('en-US');
    return d1;
}

generateTime = (curDate) => {
    const d1 = new Date(curDate).toLocaleTimeString('en-US');
    return d1;
}



  generateAnswers = (qAnsArr, allAnsArr) => {
      let arrName = [];
    //   console.log(qAnsArr)
    //   console.log(allAnsArr)
    for (let i = 0; i < qAnsArr.length; i++) {
        // console.log(qAnsArr);
        for(let j = 0; j < allAnsArr.length; j++) {
            // console.log(allAnsArr[j].text + "\n");
            // console.log(qAnsArr[i].text + "\n");
            if(qAnsArr[i].text === allAnsArr[j].text) {
                // console.log("HU");
                // console.log(allAnsArr[j])
                arrName.push(allAnsArr[j]);
            }
        }
    }
    return arrName;
  }


  generateTags = (qquestions, tquestions) => {
    let count = 0;
    let arrName = [];
    for(let i = 0; i < qquestions.tags.length; i++) {
        let tID = qquestions.tags[i]; 
        // console.log(tID);
        for(let j = 0; j < tquestions.length; j++) {
            if(tID.name === tquestions[j].name) {
                arrName.push(tquestions[j].name + " ");
                count++; 
                if(count === 4) {
                  
                }
            }
        }
    }
     return arrName;
    }
   
}

export default InsideQ;
