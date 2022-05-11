import styles from './userProfile.module.css'
import React from "react";
import TableCreateQuestion from './QTC.js';
import TableCreateAnswer from './answerTableCreation.js';
import TableCreateTag from './tagTableCreation.js';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionSelected: true,
            answerSelected: false,
            tagSelected: false,
        }
        
    }
    generateDate = (curDate) => {
        const d1 = new Date(curDate).toLocaleDateString('en-US');
        return d1;
    }

    handlerForAnswerTable = (e) => {
        e.preventDefault();
        this.setState({
            questionSelected: false,
            answerSelected: true,
            tagSelected: false,
        })
    }

    handlerForQuestionTable = (e) => {
        e.preventDefault();
        this.setState({
            questionSelected: true,
            answerSelected: false,
            tagSelected: false,
        })
    }

    handlerForTagTable = (e) => {
        e.preventDefault();
        this.setState({
            questionSelected: false,
            answerSelected: false,
            tagSelected: true,
        })
    }
    
    render() {
        const{questionSelected, answerSelected, tagSelected} = this.state;
        var t = this.props.tagData;
        // console.log(t)
        t = t.filter(e => e.createdBy === this.props.currUser.username)
        // console.log(t)
    return (
        <div>
            <table id = {styles["FirstRow"]}>
                <tbody>
                    <tr>
                        <td>
                            Memeber since: {this.generateDate(this.props.currUser.createdOn)} 
                        </td>
                        <td> 
                            Reputation: {this.props.currUser.reputation}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div>
                <nav className = {styles.sideBar}>
                    <li onClick = {this.handlerForQuestionTable}>
                        Questions
                    </li>
                    <li onClick = {this.handlerForAnswerTable}>
                        Answers
                    </li>
                    <li onClick = {this.handlerForTagTable}>
                        Tags
                    </li>
                </nav>
                <section className = {styles.infoBar}>
                    {questionSelected && <TableCreateQuestion currUser = {this.props.currUser}
                                 tagData={this.props.tagData} 
                                 questionData={this.props.questionData}
                                 commentData={this.props.commentData}
                                 currPage = {this.props.currPage}
                                 handlerHidingForQForms = {this.props.handlerHidingForQForms} 
                                 handlerChangingSpecificQ = {this.props.handlerChangingSpecificQ}
                                 handlerForNextPage = {this.props.handlerForNextPage}
                                 handlerForPrevPage = {this.props.handlerForPrevPage}/>}
                    {answerSelected && <TableCreateAnswer currUser = {this.props.currUser}
                                              tagData={this.props.tagData} 
                                              questionData={this.props.questionData}
                                              answerData={this.props.answerData}
                                              commentData={this.props.commentData}
                                              currPage = {this.props.currPage}
                                              handlerHidingForQForms = {this.props.handlerHidingForQForms} 
                                              handlerChangingSpecificQ = {this.props.handlerChangingSpecificQ}
                                              handlerForNextPage = {this.props.handlerForNextPage}
                                              handlerForPrevPage = {this.props.handlerForPrevPage}/> }
                    {tagSelected && <TableCreateTag currUser ={this.props.currUser}
                                            questionData = {this.props.questionData} 
                                           tagData = {this.props.tagData}
                                         commentData={this.props.commentData}
                                           currPage = {this.props.currPage}
                                          handlerHidingForQForms = {this.props.handlerHidingForQForms} 
                                         handlerChangingSpecificQ = {this.props.handlerChangingSpecificQ}
                                         handlerForNextPage = {this.props.handlerForNextPage}
                                         handlerForPrevPage = {this.props.handlerForPrevPage} /> }
                                 
                </section>
            </div>
        </div>
    );
    }   
}


export default UserProfile;