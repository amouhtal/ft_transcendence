import { useEffect } from 'react';
import CartNotification from '../../components/notification/Cart';
import style from '../../styles/notification/notification.module.css'

const Notification = (props:any) => {
    useEffect(() =>{
        props.socket?.on("notification", (data: any) => {
            console.log("notification here====>", data);
        })
    },[])
    return (
        <div className={style.Container}>
            <div className={style.Content}>
                <CartNotification socket={props.socket}/>
                {/* <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification /> */}
            </div>
        </div>
    )
}

export default Notification;