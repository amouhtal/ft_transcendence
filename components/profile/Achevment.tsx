import style from "../../styles/profile/sliderAchevment.module.css";
import Link from "next/link";
import NotificationProfile from "./NotificationProfile";

function Achevment(props: any) {
  return (
    <div className={style.cartSlide}>
      <div className={style.achivment}>
        <NotificationProfile />
        {/* <NotificationProfile />
        <NotificationProfile />
        <NotificationProfile />
        <NotificationProfile />
        <NotificationProfile /> */}
      </div>
    </div>
  );
}

export default Achevment;
