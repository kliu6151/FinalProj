import styles from './questionTableCreation.module.css'
import React from 'react';

class TableCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPage: true,
            prevPage: false
        }
    }

    clickSpecQ = (e,currentQ) => {
        this.props.handlerChangingSpecificQ(e,currentQ)
    }

    renderNextPage = () => {
        let z = this.props.currPage;
        z += 1;
        var quest = this.props.questionData;
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

    render() {

    // var dat = this.props.data;
    var quest = this.props.questionData;
    // console.log(this.props);

    var tag = this.props.tagData;
    // console.log(quest);
    var currentPage = this.props.currPage;
    var currSetOfQuestions = quest.slice((currentPage-1)*5, (currentPage * 5));
    return (
        <div>
        <table className = {styles.wholeQuestionTable}>
            <tbody>
                {currSetOfQuestions.map((questions) => (
                    <>
                    <tr className = {styles.rowChild}>
                        <td className = {styles.firstCol}>
                            {questions.views} Views
                             <br /> 
                             <br />
                             {questions.answers.length} Answers
                             <br />
                             <br />
                             {questions.votes} Votes
                        </td>
                        <td className = {styles.secondCol}>
                            <span id = {styles["questionsTitle"]} onClick={(e) => this.clickSpecQ(e,questions)}>
                                {questions.title}
                            </span>
                            <br />
                            <br />
                                <table>
                                    {this.generateTags(questions,tag).map((name)=>(
                                        <td className = {styles.questionsTag}>{name}</td>
                                    ))}
                                </table>
                        </td>
                        <td className = {styles.thirdCol}>
                            <span className = {styles.askBy}>
                            Asked By {questions.asked_by}
                            </span>
                            <br />
                            <span className = {styles.askOn}>
                            On {this.generateDate(questions.ask_date_time)}
                            </span>
                            <br />
                            <span className = {styles.askAt}>
                            At {this.generateTime(questions.ask_date_time)}
                            </span>
                        </td>
                    </tr>
                        <hr id = {styles["horiLine"]}/>
                    </>
                ))}
            </tbody>
        </table>
            <button id = {quest.length === 0 ? styles["invisible"] : (currentPage !== 1 ? styles["leftA"] : styles["blurredLeftA"])}  onClick = {this.renderPrevPage}>&#x2190;</button>
            <button id = {quest.length === 0 ? styles["invisible"] : (quest.length !== 0 && Math.ceil(quest.length / 5) !== currentPage ? styles["rightA"] : styles["blurredRightA"])} onClick = {this.renderNextPage}>&#x2192;</button>

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

export default TableCreate;