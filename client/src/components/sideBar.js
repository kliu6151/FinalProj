import styles from './sideBar.module.css';
import { useState } from 'react';

function SideBarSection(props) {
    const [isQActive, setIsQActive] = useState(true);
    const [isTActive, setIsTActive] = useState(false);

    const handleQColor = () => {
        setIsQActive(true);
        setIsTActive(false);
    }

    const handleTColor = () => {
        setIsQActive(false);
        setIsTActive(true);
    }

    const trigger = () => {
        props.handlerForTagPage();
        document.getElementById(styles["T"]).style.backgroundColor = '#eff0f1';
        document.getElementById(styles["Q"]).style.backgroundColor = 'white';
        document.getElementById(styles["T"]).style.borderRight = '3px solid orange';
        document.getElementById(styles["Q"]).style.borderRight = 'none';


        handleTColor()
    }

    const homepage = () => {
        props.handlerForHomePage();
        document.getElementById(styles["Q"]).style.backgroundColor = '#eff0f1';
        document.getElementById(styles["T"]).style.backgroundColor = 'white';
        document.getElementById(styles["Q"]).style.borderRight = '3px solid orange';
        document.getElementById(styles["T"]).style.borderRight = 'none';

        handleQColor()
    }

    return (
        <div className={styles.sideBarSection}>
            <div id={styles["Q"]}
                onClick={homepage}
                className={isQActive ? {} : "styles.qTest"}
            >
                Questions
            </div>

            <div id={styles["T"]}
                onClick={trigger}
                className={isTActive ? "styles.tTestB" : "styles.tTest"}
            >
                Tag
            </div>

        </div>
    );
}

export default SideBarSection;