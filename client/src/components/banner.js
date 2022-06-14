import styles from './banner.module.css'
import React from "react";
import logo from "../assets/logo.png";


class BannerSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isQActive: true,
            isTActive: false
        }
    }


    onEnter = (event) => {
        if (event.charCode === 13) {
            let v = event.target.value.split(" ");
            let sArr = [];
            let arr = [];
            for (let i = 0; i < v.length; i++) {
                v[i] = v[i].toLowerCase();
                if (v[i].charAt(0) === "[" && v[i].charAt(v[i].length - 1) === "]") {
                    let id = this.props.dataT.filter(
                        (x) => x.name === v[i].substring(1, v[i].length - 1)
                    ); // This'll return all the tagArr that contains the specified tags
                    // console.log(id);
                    for (let j = 0; j < id.length; j++) {
                        for (let k = 0; k < this.props.dataQ.length; k++) {
                            for (let x = 0; x < this.props.dataQ[k].tags.length; x++) {
                                if (this.props.dataQ[k].tags[x].name === id[j].name) {
                                    sArr = sArr.concat(this.props.dataQ[k]);
                                }
                            }
                        }
                    }
                } else {
                    arr = arr.concat(
                        this.props.dataQ.filter((x) => x.title.includes(v[i]))
                    );
                }
            }
            if (sArr.length != 0) {
                arr = arr.concat(sArr);
            }
            arr = arr.filter((c, index) => {
                return arr.indexOf(c) === index;
            });
            let searchModel = [];
            // searchModel.data.questions.length = 0;
            for (let i = 0; i < arr.length; i++) {
                searchModel.push(arr[i]);
            }
            let curTit = ""
            if (searchModel.length === 0) {
                curTit = "no results found";
            } else {
                curTit = "Search Results";
            }
            this.props.handlerForSearching(searchModel, curTit)
        }

    }

    logOut = (e) => {
        e.preventDefault();
        this.props.handlerForLoggingOut();
    }

    logIn = (e) => {
        e.preventDefault();
        this.props.handlerForLoggingIn();
    }

    handlerForProfilePage = (e) => {
        e.preventDefault();
        this.props.handlerForProfilePage();
    }

    homepage = () => {
        this.props.handlerForHomePage();
    }

    render() {
        return (
            <div id={styles["bannerBg"]}>
                <div id={styles["banner"]}>
                <img id={styles["logoS"]} src={logo} alt="logo"/>
                    <span id={styles["TitleStack"]}  >
                        stack 
                        <span id={styles["Title"]}>
                         fakeflow
                        </span>
                    </span>
                    <input id={styles["search"]} type="text" placeholder="Search ..." name="search" onKeyPress={this.onEnter} />
                    <span id={!this.props.guestMode ? styles["profile"] : null} onClick={!this.props.guestMode ? this.handlerForProfilePage : null}> {!this.props.guestMode ? this.props.currUser.username : "Guest"} </span>
                    <span id={!this.props.guestMode ? styles["logout"] : styles["login"]} onClick={!this.props.guestMode ? this.logOut : this.logIn}> {!this.props.guestMode ? "Log Out" : "Log In"} </span>
                </div>
            </div>
        )
    }

}



export default BannerSection;