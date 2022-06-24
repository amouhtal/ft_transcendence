import style from "../../styles/profile/sliderAchevment.module.css";
import Link from "next/link";
import NotificationProfile from "./NotificationProfile";
import LiveListMatch from "../LiveMatch/ListeLiveMatch";

function Achevment(props: any) {
  return (
    <div className={style.cartSlide}>
      <div className={style.achivment}>
        {props.Myprofile ? <NotificationProfile /> : <LiveListMatch LiveM={true}/>}
      </div>
    </div>
  );
}

export default Achevment;
