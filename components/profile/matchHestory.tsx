import style from "../../styles/profile/matchHestory.module.css"
import users from "../../users-data.json"
import img from "../../public/images/homme-jouant-au-tennis.png"
import image from "../../public/images/sttar.png"
import imag from "../../public/images/profile.jpg"
import crry from "../../public/images/crrey.png"
import Image from 'next/image'
import { useState } from "react"

function MatchHestory (props:any) {
    console.log(props.gameHistory)
    const [History, setHistory] = useState<any>(props.gameHistory)
    return(
        <div className={style.Container}>
            <p className={style.matchHestory}> Match History</p>
            <div className={style.containerHistory}>
                    {props.gameHistory?.map((use:any,index:any) =>(
                    <div className={style.match} key={index} >
                        <div className={style.chaild1}>
                            <p className={style.EndMatch}> End Match {index}</p>
                            <p className={style.EndMatch}>{use.played_at}</p>
                        </div>
                        <div className={style.content}>
                            <div className={style.child2}>
                                <div className={style.myimg}><img src={use.winner?.picture} className={style.img1} width={70} height={70}/></div>
                                <p className={style.EndMatch}>{use.winner?.userName}</p>
                                <div className={style.winIcon}>
                                    <p className={style.EndMatch}>Win</p>
                                    <img src={image.src} className={style.imgicon}></img>
                                </div>
                                <p className={style.EndMatch1}>{use.winner?.score}</p>
                            </div>
                            <p className={style.VS}>VS</p>
                            <div className={style.child3}>
                                <div className={style.vsimg}><img src={use.loser?.picture} className={style.img2} width={70} height={70}/></div>
                                <p className={style.EndMatch}>{use.loser?.userName}</p>
                                <div className={style.winIcon}>
                                    <p className={style.EndMatch}>{use.oppenonet?.end}</p>
                                    <img src={crry.src} className={style.imgicon}></img>
                                </div>
                                <p className={style.EndMatch1}>{use.loser?.score}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MatchHestory