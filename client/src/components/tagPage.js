import React from 'react'
import styles from './tagPage.module.css'

class Tag extends React.Component {
    constructor(props){
        super(props)
    }

    clickSpecT = (e,currentT) => {
        let mod = this.props.tagDataQ
        let searchModel = [];

    //     axios.get('http://localhost:8000/questions')
    // .then(res => {
    //   searchModel = res;
    // })
        
        // const test = mod.filter((specQ) => specQ.tags.filter(()))
        // console.log(test)
        // console.log(mod[0])
        // searchModel.length = 0;
        // console.log(searchModel)
        // searchModel.data.tags = tags;
        for (let j = 0; j < mod.length; j++) {
            for(let i = 0; i < mod[j].tags.length; i++) {
                if(mod[j].tags[i].name === currentT.name) {
                    searchModel.push(mod[j]);
                }
            }
        }
        // console.log(searchModel);
        // for (let j = 0; j < searchModel.length; j++) {
        // new TableCreate(searchModel);
        // }
    
  


        this.props.handlerChangingSpecificT(e,currentT, searchModel)

    }

    render() {
        var tags = this.props.tagDataT
        var mod = this.props.tagDataQ
        // console.log(tags)
        return (
            <div className = {styles.wholeTagTable}>
                {tags.map((tag) => (
                    <span className = {styles.tagPageTags}>
                        <span className = {styles.tagPageTagSpecific} onClick = {(e) => this.clickSpecT(e,tag)}>
                        {tag.name}
                        </span>
                        <div className = {styles.tagPageQAmt}>
                            {this.tagAppearance(tag,mod)} Questions
                        </div>
                    </span>
                ))}
            </div>
        )
    }




    tagAppearance = (tagS,mod) => {
        let c = 0;
        // console.log(tagS.tid)
        for(let i = 0; i < mod.length; i++) {
            // console.log(mod[i].tags)
            // console.log(tagS.name)
            for(let j = 0; j < mod[i].tags.length; j++) 
            {
                if(mod[i].tags[j].name === tagS.name)
                {
                    // console.log("HI");
                    c++;
                }
            }
            // if(mod[i].tags.includes(tagS.name)) {
            //     // console.log("YER")
            //     c++;
            // }
        }
        // console.log(c)
        return c
    }
}

export default Tag;