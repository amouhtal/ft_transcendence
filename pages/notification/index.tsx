import CartNotification from '../../components/notification/Cart';
import style from '../../styles/notification/notification.module.css'

const Notification = () => {
    return (
        <div className={style.Container}>
            <div className={style.Content}>
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
                <CartNotification />
            </div>
        </div>
    )
}

export default Notification;