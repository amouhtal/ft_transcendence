import { useEffect } from 'react';
import CartNotification from '../../components/notification/Cart';
import style from '../../styles/notification/notification.module.css'

const Notification = (props:any) => {
    useEffect(() =>{
        props.socket?.on("notification", (data: any) => {
        })
    },[])
    return (
        <div className={style.Container}>
            <div className={style.Content}>
                <CartNotification socket={props.socket} MyP={false}/>
            </div>
        </div>
    )
}

export default Notification;