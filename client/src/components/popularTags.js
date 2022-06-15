import React from 'react';
import styles from './popularTags.module.css';

class PopularTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }


    render() {
        var allTags = this.props.tagData;
        var allQ = this.props.questionData;
        return(
        <div id = {styles["popularTagContainer"]}>
            <h2 id = {styles["popularTagTitle"]}>Popular Tags</h2>
            <div className={styles.tagGrid}>
                {allTags.map((tag) => (
                    <div>
                        <span className={styles.tag} onClick={(e) => this.clickSpecT(e,tag)}>{tag.name}</span> <span id = {styles["smallMultiplier"]}>× &nbsp;{this.tagAppearance(tag,allQ)} </span>
                    </div>
                ))}
            </div>
        </div>
        );
    }

    tagAppearance = (tagS,mod) => {
        let c = 0;
        for(let i = 0; i < mod.length; i++) {

            for(let j = 0; j < mod[i].tags.length; j++) 
            {
                if(mod[i].tags[j].name === tagS.name)
                {
                    c++;
                }
            }
        }
        return c;
    }

    clickSpecT = (e,currentT) => {
        let mod = this.props.questionData;
        let searchModel = [];

        for (let j = 0; j < mod.length; j++) {
            for(let i = 0; i < mod[j].tags.length; i++) {
                if(mod[j].tags[i].name === currentT.name) {
                    searchModel.push(mod[j]);
                }
            }
        }

        this.props.handlerChangingSpecificT(e,currentT, searchModel)

    }
}
export default PopularTags;