import style from "../../styles/profile/sliderAchevment.module.css";
import Link from "next/link";
import LiveListMatch from "../LiveMatch/ListeLiveMatch";
import CartNotification from "../notification/Cart";

function Achevment(props: any) {
  return (
    <div className={style.cartSlide}>
      <div className={style.achivment}>
        {props.Myprofile ? <CartNotification MyP={true}/> : <LiveListMatch LiveM={true}/>}
      </div>
    </div>
  );
}

export default Achevment;
