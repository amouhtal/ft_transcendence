import style from "../../styles/CartWin/cartwin.module.css";
import win from "../../public/images/one-removebg-preview.png";
import imgme from "../../public/images/profile.jpg";
import circleimg from "../../public/images/cercle1-removebg-preview.png";
import Link from "next/link";
const Cartwin = (props:any) => {
  return (
    <div className={style.container}>
      <div className={style.gameover}>
        <p className={style.Pgame}>
          GAME <span className={style.spanover}>OVER</span>
        </p>
      </div>
      <div className={style.row}>
        <div className={style.content}>
          <div className={style.child1}>
            <div className={style.divwin}>
              <img src={win.src} className={style.winicon}></img>
            </div>
            <p className={style.Congra}>
              Congratulations...
              <span className={style.usertext}>{props.userName}</span>
            </p>
            <div className={style.allimg}>
              <img src={circleimg.src} className={style.circleicon}></img>
              <img src={imgme.src} className={style.usericon}></img>
            </div>
          </div>
          <div className={style.twolastP}>
            <p className={style.scor}>
              SCORE : <span className={style.scornbr}>{props.score}</span>
            </p>
          </div>
          <p className={style.youwin}>YOU WIN</p>
          <Link href={'/home'}><button className={style.btn}>Exit</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Cartwin;
