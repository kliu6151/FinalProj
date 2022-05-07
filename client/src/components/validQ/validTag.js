import React from 'react';
import styles from './validQ.module.css'


class ValidTag extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidQ}>Creating new tags require at least 100 reputation: Current Reputaton ({this.props.currU.reputation})</div>

        );
    }

}

export default ValidTag;