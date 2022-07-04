import Style from "../../styles/profile/Profile.module.css";
import CartProfile from "../../components/profile/cartProfile";
import MatchHestory from "../../components/profile/matchHestory";
import Achevment from "../../components/profile/Achevment";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type } from "os";
import UserInfoPopup from "../../components/UserInfoPopup/UserInfoPopup";
import UserInfoPopup2 from "../../components/UserInfoPopup/UserInfoPopup2";


function Profile() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [MatchHistory, setMatchHistory] = useState<any>([]);
  const route = useRouter();
  const [userName, setUsername] = useState<boolean>(false);

  const [showContent, setShowContent] = useState<boolean>(false);
  const [Popup ,setPopup] = useState<Boolean>(false);
  useEffect(() => {
      axios
        .post(
          `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
          null,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("accessToken") as string
              }`,
            },
          }
        )
        .then((res) => {
          setUserInfo(res.data.userInfo);
          setMatchHistory(res.data.gameHistory);
        })
        .catch(function (error){
          if (error.response){
              route.push({pathname :`/errorPage/${error.response.status}`})
          }
      })
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (route.query.token && route.query.refreshToken) {
        localStorage.setItem("accessToken", route.query.token as string);
        localStorage.setItem(
          "refreshToken",
          route.query.refreshToken as string
        );
      }
      // route.push("/home");
    }
        const resp: any = axios
        .get(
          `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/CheckUserName`,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("accessToken") as string
              }`,
            },
          }
        )
        .then((res) => {
          setUsername(res.data.exist);
        })
        .catch((error: any) => {
          if (
            error.response?.status === 401 &&
            localStorage.getItem("accessToken") !== "" &&
            localStorage.getItem("accessToken") !== "undefined" &&
            localStorage.getItem("accessToken") !== null
          ) {
            console.log(
              "hererere=",
              localStorage.getItem("refreshToken") as string
            );
            axios
              .get(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42/refresh`,
                {
                  data: {
                    refreshToken: localStorage.getItem("refreshToken"),
                  },
                }
              )
              .then((res: any) => {
                console.log("resp =", res);
              });
          }
        });
  }, [route.query.token]);
  return (
    <>
      <div className={Style.container}>
        <div className={Style.header}>
          <CartProfile data={userInfo} Myprofile={true} setPopup={setPopup} Popup={Popup}/>
          <Achevment Myprofile={true} />
        </div>
        <MatchHestory userData={userInfo} gameHistory={MatchHistory} />
      </div>
      {Popup && <UserInfoPopup2 />}
    </>
  );
}

export default Profile;
