import React from 'react';
import styles from './pageArrow.module.css'


class PageArrow extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div id = {styles["arrows"]}>
                <span id = {styles["leftA"]}>&#x2190;</span>
                <span id = {styles["rightA"]} onClick = {this.props.nextPg ? this.props.renderNextPage : null}>&#x2192;</span>
            </div>
        );
    }

}

export default PageArrow;