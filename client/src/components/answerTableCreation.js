import styles from './answerTableCreation.module.css'
import React from 'react';

class TableCreateAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: true,
            prevPage: false,
            editable: false
        }
    }

    clickSpecQ = (e,currentQ) => {
        this.props.handlerChangingSpecificQ(e,currentQ)
    }

    renderNextPage = () => {
        let z = this.props.currPage;
        z += 1;
        var quest = this.props.answerData;
        if(quest.slice((z-1)*5, (z * 5)).length !== 0) {
            this.props.handlerForNextPage(z);
        }
    }

    renderPrevPage = () => {
        let z = this.props.currPage;
        z -= 1;
        if(z !== 0) {
            this.props.handlerForPrevPage(z)
        }
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

    render() {

    var quest = this.props.answerData;
    var tag = this.props.tagData;
    var currentPage = this.props.currPage;
    var com = this.props.commentData;
    quest = quest.filter((e) => e.ans_by === this.props.currUser.username)
    var currSetOfQuestions = quest.slice((currentPage-1)*5, (currentPage * 5));
    return (
        <div>
        <table className = {styles.wholeQuestionTable}>
            <tbody>
                {currSetOfQuestions.map((questions) => (
                    <>
                    <tr className = {styles.rowChild}>
                        <td className = {styles.answerText}>
                                {questions.text}
                                <br />
                                <br />
                                <br />
                                {this.generateAnswers(questions.comments,com).slice((questions.comPage-1)*3, (questions.comPage * 3)).map((name) => (
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
                                <button id = {questions.comments.length === 0 ? styles["invis"] : (questions.comPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])} onClick = {(e) => {this.renderPrevAComPage(e,questions)}}>&#x2190;</button>
                                <button id = {questions.comments.length === 0 ? styles["invis"] : (questions.comments.length !== 0 && Math.ceil(questions.comments.length / 3) !== questions.comPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {(e) => {this.renderNextAComPage(e,questions)}}>&#x2192;</button>
                                <br />

                            </td>
                        <td className = {styles.thirdCol}>
                                <span className = {styles.ansBy}>
                                Ans By {questions.ans_by} 
                                </span>
                                <br />
                                <span className = {styles.ansOn}>
                                On {this.generateDate(questions.ans_date_time)} 
                                </span>
                                <br />
                                <span className = {styles.ansAt}>
                                At {this.generateTime(questions.ans_date_time)} 
                                </span>
                            </td>
                    </tr>
                        <hr id = {styles["horiLine"]}/>
                    </>
                ))}
            </tbody>
        </table>
            <button id = {quest.length === 0 ? styles["invis"] : (currentPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])} onClick = {this.renderPrevPage}>&#x2190;</button>
            <button id = {quest.length === 0 ? styles["invis"] : (quest.length !== 0 && Math.ceil(quest.length / 5) !== currentPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {this.renderNextPage}>&#x2192;</button>

        </div>
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

export default TableCreateAnswer;