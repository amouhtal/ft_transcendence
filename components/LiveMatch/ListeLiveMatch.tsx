import style from '../../styles/watchMatch/livelisteMatch.module.css'
import styleP from '../../styles/watchMatch/livelisteMatchP.module.css'
import Image from 'next/image'
import imge from '../../public/images/profile.jpg'

const LiveListMatch = (props: any) =>{
    return (
        <div className={!props.LiveM ? style.listeMtch : styleP.listeMtch}>
            <div className={!props.LiveM ? style.player1 : styleP.player1}>
                <div className={!props.LiveM ? style.imagediv : styleP.imagediv}><img src={imge.src} className={!props.LiveM ? style.img : styleP.img}/></div>
                <p className={!props.LiveM ? style.userName : styleP.userName}>Zakdim</p>
            </div>
            <p className={!props.LiveM ? style.Vs: styleP.Vs}>VS</p>
            <div className={!props.LiveM ? style.player2 : styleP.player2}>
                <div className={!props.LiveM ? style.imagediv : styleP.imagediv}>
                    <img  src={imge.src} className={!props.LiveM ? style.img : styleP.img}/>
                </div>
                <p className={!props.LiveM ? style.userName : styleP.userName}>Bettachi</p>
            </div>
            <button className={!props.LiveM ? style.watch : styleP.watch}>Watch</button>
        </div>
    )
};
export default LiveListMatch;