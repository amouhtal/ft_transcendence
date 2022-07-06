import {Player, Player2} from "../../components/game/cartPlayer";
import style from "../../styles/game/HomeGame.module.css";
import Game from "../../components/game";
import UserInfoPopup from "../../components/UserInfoPopup/UserInfoPopup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import leagend from "../../public/images/3amii9.png";
import { Loading } from "@nextui-org/react";
import axios from "axios";
import CountDown from "../../components/conterDown/conterDown";
import Cartwin from "../../components/cartwin/cartwin";
import CartLose from "../../components/cartlose/cartlose";
import Link from "next/link";

const HomeGame = (props: any) => {
  const [oppenent, changeOpp] = useState("Waiting");
  const [players, changeName] = useState({
    player1: "",
    pic1: "",
    player2: "",
    pic2: "",
  });
  const [gameOver, changeGameOver] = useState("")
  const [score, changeScore] = useState<any>({
    player1: 0,
    player2: 0,
  });
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ballSize = urlParams.get('ballSize')
    const speed = urlParams.get('speed')
    props.socket?.emit("matchmaking",{ballSize, speed});
    props.socket?.on("matchmaking", (data: any) => {
      if (typeof data != "string") {
        if (typeof window != "undefined")
        if (oppenent != "Winner" && oppenent != "Loser"){
          axios.post(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/getPicture`,
              { userName1: data[0], userName2: data[1] },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            )
            .then((res) => {
              changeName({
                player1: data[0],
                player2: data[1],
                pic1: res.data.user1,
                pic2: res.data.user2,
              });
            });
            if (data[2] === "Found"){
              changeOpp("counter")
              window.setTimeout(()=>{
                props.socket?.emit("setInterval");
                changeOpp(data[2]);
                },6000)  
            } else if (data[2] === "Watcher" ||data[2] === "playing"){
              changeOpp(data[2])
            }
          }
        }
      });
      return () => props.socket?.off("matchmaking")

  }, [props.socket]);
    useEffect(()=>{
      props.socket?.on("gameOver",(data:any) =>{
        changeOpp(data.status)
        changeScore({player1:data.playerStat.player1score,player2:data.playerStat.player2score})
        changeGameOver(data.player)
      })
      return () => props.socket?.off("gameOver")
    },[props.socket])
    useEffect(()=>{
      props.socket?.on("opponentLeft",(data:any) =>{
        console.log(data.user)
        changeOpp("Winner")
        changeGameOver(data.user)
      })
      return () => props.socket?.off("opponentLeft")
    },[props.socket])
  return (
    <>
      <div className={style.Container}>
        {oppenent == "Waiting" ? (
          <div style={{ display: "flex", flexFlow: "column" }}>
            <Loading type="spinner" size="xl" />
            <p>Waiting for Oppenent ...</p>
          </div>
        ) : oppenent === "counter" ? (
          <CountDown />
        ):
        oppenent === "Winner" ? (
          <Cartwin userName={gameOver} score={gameOver == players.player1 ? score.player1 : score.player2} img={gameOver == players.player1 ? players.pic1: players.pic2}/>
        ):
        oppenent === "Loser" ? (
          <CartLose userName={gameOver} score={gameOver == players.player1 ? score.player1 : score.player2} img={gameOver == players.player1 ? players.pic1: players.pic2}/>
        ):oppenent == "Found" || oppenent == "Watcher" || oppenent == "playing"? (
          <>
              <Link href={'/home'} ><button className={style.btn} onClick={() => props.socket.emit("leaving")}>Go back</button></Link>
            <div className={style.CartsPlayers}>
              <div className={style.cartPlayer1}>
                <Player
                  score={score.player1}
                  name={players.player1}
                  img={players.pic1}
                />
              </div>
              <div className={style.cartPlayer2}>
              <Player2
                score={score.player2}
                name={players.player2}
                img={players.pic2}
              />
            </div>
            </div>
            <div className={style.containerGame}><Game changeScore={changeScore} socket={props.socket} score={score}/></div>
          </>
        ):""}
      </div>

      {/* {test.sizes_.zak_test && <UserInfoPopup />} */}
    </>
  );
};

export default HomeGame;