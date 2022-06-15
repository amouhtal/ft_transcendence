import style from "../../styles/CartLose/cartlose.module.css";
import lose from "../../public/images/two-removebg-preview.png";
import imgme from "../../public/images/profile.jpg";
const CartLose = (props:any) => {
  return (
    <div className={style.container}>
      <div className={style.gameover}>
        <p className={style.Pgame}>
          GAME <span className={style.spanover}>OVER</span>
        </p>
      </div>
      <div className={style.row}>
        <div className={style.row1}>
          <div className={style.child1}>
            <div className={style.divLose}>
              <img src={lose.src} className={style.Loseicon}></img>
            </div>
            <p className={style.Sorry}>
              We Are Sorry... <span className={style.usertext}>{props.userName}</span>
            </p>
            <div className={style.allimg}>
              <img src={props.img} className={style.usericon}></img>
            </div>
          </div>
          <div className={style.twolastP}>
            <p className={style.scor}>
              SCORE : <span className={style.scornbr}>{props.score}</span>
            </p>
          </div>
          <p className={style.youLose}>YOU LOSE</p>
        </div>
      </div>
    </div>
  );
};

export default CartLose;
