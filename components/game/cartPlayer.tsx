import image from '../../public/imgSlide/IMG_20210525_100044_455.jpg'
import  style from '../../styles/game/CartPlayer.module.css'
import smaile from '../../public/images/smaile.png'
import angry from '../../public/images/angry.png'
import leagend from '../../public/images/3amii9.png'
const Player = (props:any) =>{
    return(
        <div className={style.Container}>
            <div>
                <img src={props.img} className={style.imageUser}/>
            </div>
            <div className={style.Content}>
                <p className={style.UserName}>{props.name}</p>
                <div className={style.Score}>
                    <p className={style.Pscore}>Score</p>
                    <h3 className={style.score}>{props.score}</h3>
                </div>
                <div className={style.ListImoji}>
                    <img className={style.imgImoji} src={smaile.src}/>
                    <img className={style.imgImoji} src={angry.src}/>
                    <img className={style.imgImoji} src={leagend.src}/>
                </div>
            </div>
        </div>
    )
}
export default Player