import style from '../../styles/notification/NotificationP.module.css'
import img from '../../public/images/profile.jpg'
import accept from '../../public/images/usersImages/accept.png'
import reject from '../../public/images/usersImages/reject.png'
import Link from 'next/link'
const NotificationProfile = () =>{
    return(
        <div className={style.CartContainer}>
            <Link href='/users/zakdim'><div className={style.userInfo}>
                <img src={img.src} className={style.userimageOff}></img>
                <p className={style.userName}>Zakarya</p>
            </div></Link>
            <span className={style.sparet}></span>
            <p className={style.textContent}>Copyright Disclaimer under Section 107 of thecopyright act</p>
            <div className={style.allButton}>
                <img src={accept.src} className={style.icon}></img>
                <img src={reject.src} className={style.icon}></img>
                <button className={style.btn}>View</button>
            </div>
        </div>
    )
}

export default NotificationProfile