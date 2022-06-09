import style from '../../styles/notification/notification.module.css'
import img from '../../public/images/profile.jpg'
import Link from 'next/link'
const CartNotification = () =>{
    return(
        <div className={style.CartContainer}>
            <Link href='/users/zakdim'><div className={style.userInfo}>
                <img src={img.src} className={style.userimageOff}></img>
                <p className={style.userName}>Zakarya</p>
            </div></Link>
            <span className={style.sparet}></span>
            <p className={style.textContent}>Copyright Disclaimer under Section 107 of thecopyright act</p>
            <div className={style.allButton}>
                <button className={style.btn}>Accept</button>
                <button className={style.btn}>Rejecte</button>
                <button className={style.btn}>View</button>
            </div>
        </div>
    )
}

export default CartNotification