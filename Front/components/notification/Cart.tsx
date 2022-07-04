import style from "../../styles/notification/notification.module.css";
import style2 from '../../styles/notification/NotificationP.module.css'

import img from "../../public/images/profile.jpg";
import Link from "next/link";
import accept from '../../public/images/usersImages/accept.png'
import reject from '../../public/images/usersImages/reject.png'

const CartNotification = (props: any) => {
  props.socket?.on("notification", (data:any) =>{
  })
  const data = {    
    type: 'Invitation'
  }
  return (
    <div className={props.MyP ? style2.CartContainer : style.CartContainer}>
      <Link href="/users/zakdim">
        <div className={props.MyP ? style2.userInfo : style.userInfo}>
          <img src={img.src} className={props.MyP ? style2.userimageOff : style.userimageOff}></img>
          <p className={props.MyP ? style2.userName: style.userName}>zakaria</p>
        </div>
      </Link>
      <span className={props.MyP ? style2.sparet : style.sparet}></span>
      <div className={props.MyP ? style2.textContent : style.textContent}>
        {data.type == 'game' ? <p>game game game game game game game game game game game game game </p> : data.type == 'message' ? <p>message' message' message' message' message' message' message'</p> :
         data.type == 'joinGroub' ? <p>joinGroub joinGroub joinGroub joinGroub joinGroub</p> :  data.type == 'Invitation' && <p>Invitation Invitation Invitation Invitation Invitation Invitation</p>}
      </div>
      {
        !props.MyP ? <div className={style.allButton}>
        { data.type == 'game' && <button className={style.btn}>Accept</button>}
        { data.type == 'game' && <button className={style.btn}>Rejecte</button>}
        {(data.type == 'message' || data.type == 'Invitation') && <button className={style.btn}>View</button>}
        </div>
        : <div className={style2.allButton}>
          {data.type == 'game' && <img src={accept.src} className={style2.icon}></img>}
          {data.type == 'game' && <img src={reject.src} className={style2.icon}></img>}
          {data.type == 'message' && <Link href={"/messages"}><button className={style2.btn}>View</button></Link>}
          {data.type == 'Invitation' && <Link href={"/users/zakdim"}><button className={style2.btn}>View</button></Link>}
         </div>
      }
    </div>
  );
};

export default CartNotification;
