import React from 'react';
import styles from './validQ.module.css'


class ValidUser extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidQ}>{this.props.invalidSUser}</div>

        );
    }

}

export default ValidUser;