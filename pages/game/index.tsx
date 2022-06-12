import CartPlayer from "../../components/game/cartPlayer";
import style from "../../styles/game/HomeGame.module.css";
import Game from "../../components/game";
import UserInfoPopup from "../../components/UserInfoPopup/UserInfoPopup";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import leagend from "../../public/images/3amii9.png";
import { Loading } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
const HomeGame = (props: any) => {
  const router = useRouter()
  const [oppenent, changeOpp] = useState("Waiting");
  const [players, changeName] = useState({
    player1: "",
    pic1: "",
    player2: "",
    pic2: "",
  });
  const [score, changeScore] = useState<any>({
    player1: 0,
    player2: 0,
  });
  const test: any = useSelector<any>((state) => state);
  useEffect(() => {
    props.socket?.emit("matchmaking");
    props.socket?.on("matchmaking", (data: any) => {
      if (typeof data != "string") {
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
          }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });
      }
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
        ) : (
          <>
            <img className={style.imgImoji} src={leagend.src} />
            <div className={style.cartPlayer}>
              <CartPlayer
                score={score.player1}
                name={players.player1}
                img={players.pic1}
              />
            </div>
            {/* <div className={style.Game}> */}
            <Game changeScore={changeScore} />
            {/* </div> */}
            <div className={style.cartPlayer}>
              <CartPlayer
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
