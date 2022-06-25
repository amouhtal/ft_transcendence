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

const HomeGame = (props: any) => {
  const [oppenent, changeOpp] = useState("run ");
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
    props.socket?.emit("matchmaking");
    props.socket?.on("matchmaking", (data: any) => {
      if (typeof data != "string") {

        if (typeof window != "undefined")
        changeOpp("counter")
        window.setTimeout(()=>{
          props.socket?.emit("setInterval");
          changeName((oldvalues) => ({
            ...oldvalues,
            player1: data[0],
            player2: data[1],
          }));
          changeOpp("Found");
          axios
            .post(
              `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/getPicture`,
              { userName1: data[0], userName2: data[1] },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            )
            .then((res) => {
              changeName((oldvalues) => ({
                ...oldvalues,
                pic1: res.data.user1,
                pic2: res.data.user2,
              }));
            });
          },6000)
        }
        props.socket?.on("opponentLeft",(data:any) =>{
          changeOpp("Winner")
          changeGameOver(data.user)
        })
        props.socket?.on("gameOver",(data:any) =>{
          console.log(data)
          changeOpp(data.status)
          changeScore({player1:data.playerStat.player1score,player2:data.playerStat.player2score})
          changeGameOver(data.player)
        })
    });
  }, []);
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
        ):(
          <>
            <div className={style.cartPlayer1}>
              <Player
                score={score.player1}
                name={players.player1}
                img={players.pic1}
              />
            </div>
            <Game changeScore={changeScore} socket={props.socket} score={score}/>
            <div className={style.cartPlayer2}>
              <Player2
                score={score.player2}
                name={players.player2}
                img={players.pic2}
              />
            </div>
          </>
        )}
      </div>

      {/* {test.sizes_.zak_test && <UserInfoPopup />} */}
    </>
  );
};

export default HomeGame;
