import image from '../../public/imgSlide/IMG_20210525_100044_455.jpg'
import  style from '../../styles/game/CartPlayer.module.css'

export const Player = (props:any) =>{
    return(
        <div className={style.Container}>
            <div>
                <img src={image.src} className={style.imageUser}/>
            </div>
            <div className={style.UserName}>zakarya</div>
            <div className={style.Score}>
                <p className={style.Pscore}>Score</p>
                <h3 className={style.score}>{props.score}</h3>
            </div>
        </div>
    )
}

export const Player2 = (props:any) =>{
    return(
        <div className={style.Container2}>
            <img src={image.src} className={style.imageUser}/>
            <div className={style.UserName}>zakarya</div>
            <div className={style.Score1}>
                <p className={style.Pscore}>Score</p>
                <h3 className={style.score}>{props.score}</h3>
            </div>
        </div>
    )
}
