import React from 'react';
import styles from './validQ.module.css'

class ValidTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            
            <div className = {styles.invalidQ}>{this.props.invalidSTitle}</div>
            
        );
    }

}

export default ValidTitle;