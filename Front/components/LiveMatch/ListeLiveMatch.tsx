import style from '../../styles/watchMatch/livelisteMatch.module.css'
import styleP from '../../styles/watchMatch/livelisteMatchP.module.css'
import Image from 'next/image'
import imge from '../../public/images/profile.jpg'
import { useEffect } from 'react';
import Router from 'next/router';

const LiveListMatch = (props: any) =>{
    useEffect(()=>{
        props.socket?.on("addWatcher",(data:any) =>{
            Router.push({pathname:"/game"})
        })
    },)
    return (
        <div className={!props.LiveM ? style.listeMtch : styleP.listeMtch}>
        <div className={!props.LiveM ? style.player1 : styleP.player1}>
               <div className={!props.LiveM ? style.imagediv : styleP.imagediv}>
                   <img src={props.data?.playerpic1} className={!props.LiveM ? style.img : styleP.img}/>
               </div>
            <p className={!props.LiveM ? style.userName : styleP.userName}>{props.data?.player1}</p>
        </div>
        <p className={!props.LiveM ? style.Vs: styleP.Vs}>VS</p>
        <div className={!props.LiveM ? style.player2 : styleP.player2}>
               <div className={!props.LiveM ? style.imagediv : styleP.imagediv}>
                   <img  src={props.data?.playerpic2} className={!props.LiveM ? style.img : styleP.img}/>
               </div>
            <p className={!props.LiveM ? style.userName : styleP.userName}>{props.data?.player2}</p>
        </div>
           <button id={props.data?.player1} className={!props.LiveM ? style.watch : styleP.watch}
           onClick={(e:any)=>{
                   props.socket.emit("addWatcher",e.target.id)
                   console.log("test")
                   }}>Watch
           </button>
    </div>
    )
};
export default LiveListMatch;