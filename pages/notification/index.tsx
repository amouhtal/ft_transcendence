import { useEffect } from 'react';
import CartNotification from '../../components/notification/Cart';
import style from '../../styles/notification/notification.module.css'
import UserInfoPopup2 from "../../components/UserInfoPopup/UserInfoPopup2";
import { useSelector } from "react-redux";

const Notification = (props:any) => {
    useEffect(() =>{
        props.socket?.on("notification", (data: any) => {
        })
    },[])
  const test: any = useSelector<any>((state) => state);
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
            {test.sizes_.zak_test && <UserInfoPopup2 />}
        </div>
    )
}

export default Notification;