import styles from './insideQuestion.module.css'
import React from 'react';

class InsideQ extends React.Component {
    constructor(props) {
        super(props);

    }


    clickSpecA = (e) => {
        this.props.handlerChangingSpecificA(e)
    }

    renderNextPage = () => {
        let z = this.props.currPage;
        z += 1;
        var quest = this.props.specificQ;
        var ans = this.props.answerData;

        if(this.generateAnswers(quest.answers,ans).slice((z-1)*5, (z * 5)).length !== 0) {

            this.props.handlerForNextAnsPage(z);
        }
    }

    renderPrevPage = () => {
        let z = this.props.currPage;
        z -= 1;
        if(z !== 0) {
            this.props.handlerForPrevAnsPage(z)
        }
    }

    handlerForAnswerVoteUp = (currA) => {
        if(this.props.currUser.reputation >= 100) {
            if(!this.props.currUser.votedOn.includes(currA._id + "UP"))
            {
                const me = (e) => {
                    e.preventDefault();


                    this.props.handlerForAnswerVoteUp(currA)
            }
                return me;
            }
        }

    }

    handlerForAnswerVoteDown = (currA) => {
        if(this.props.currUser.reputation >= 100) {
            if(!this.props.currUser.votedOn.includes(currA._id + "DOWN"))
            {
                const me = (e) => {
                    e.preventDefault();
                    this.props.handlerForAnswerVoteDown(currA)
                }
                return me;
            }
        }
    }

    handlerForQuestionVoteUp = (currQ) => {
        if(!this.props.currUser.votedOn.includes(currQ._id + "UP"))
            {
                const me = (e) => {
                    e.preventDefault();
                    this.props.handlerForAnswerVoteUp(currQ)
            }
                return me;
            }
    }

    handlerForQuestionVoteDown = (currQ) => {
        if(!this.props.currUser.votedOn.includes(currQ._id + "DOWN"))
        {
            const me = (e) => {
                e.preventDefault();
                this.props.handlerForAnswerVoteDown(currQ)
            }
            return me;
        }
    }

    render() {
    var quest = this.props.specificQ;
    var ans = this.props.answerData;
    var tag = this.props.tagData;
    

    return (
        <>
        <table className = {styles.wholeAnswerTable}>
            <tbody>
                <tr>
                    <td className = {styles.firstCol}>
                        {++quest.views} Views
                        <br />
                        <br />
                        <div onClick = {this.handlerForAnswerVoteUp(quest)}>&#x2191;</div>
                        Votes: {quest.votes}
                        <div onClick = {this.handlerForAnswerVoteDown(quest)}>&#x2193;</div>
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
        <textarea id = {styles["AText"]} name = "AText"> </textarea> 
             <hr id = {styles["horiLine"]}/>
        <table className = { styles.wholeAnswerTable}>
            <tbody>
                {/* <tr> */}
                    {this.generateAnswers(quest.answers,ans).slice((this.props.currPage-1)*5, (this.props.currPage * 5)).map((name)=>(
                        <>
                        <tr>
                            <td className= {styles.firstColA}>
                                <div onClick = {this.handlerForAnswerVoteUp(name)}>&#x2191;</div>
                                <span >Votes: {name.votes}</span>
                                <div onClick = {this.handlerForAnswerVoteDown(name)}>&#x2193;</div>
                            </td>
                            <td className = {styles.answerText}>
                                {name.text}
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
        <button id = {styles["leftA"]} onClick = {this.renderPrevPage}>&#x2190;</button>
            <button id = {styles["rightA"]} onClick = {this.renderNextPage}>&#x2192;</button>
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
    for (let i = 0; i < qAnsArr.length; i++) {
        // console.log(qAnsArr);
        for(let j = 0; j < allAnsArr.length; j++) {
            // console.log(allAnsArr[j].text + "\n");
            // console.log(qAnsArr[i].text + "\n");
            if(qAnsArr[i].text === allAnsArr[j].text) {
                // console.log("HU");
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
