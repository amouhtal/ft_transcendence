import styles from '../../styles/popup/popup.module.css'
import { IoIosCloseCircle } from "react-icons/io";
const Popup = (props: any) : any => {
    return ((props.trigger) ?
    <div className={styles.container}>
        <div className={styles.popupContainer}>
            <div className={styles.popupInner}>
                <IoIosCloseCircle className={styles.closeButton} onClick={() => props.setTrigger(false)}/>
                <h1 className={styles.header}>{props.title}</h1>
                <p>{props.Child}</p>
            </div>
        </div>
    </div>
    : "")
}

export default Popup;