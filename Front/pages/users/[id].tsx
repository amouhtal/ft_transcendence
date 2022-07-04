import Style from "../../styles/profile/Profile.module.css";
import userData from "../../data.json";
import { useRouter } from "next/router";
import CartProfile from "../../components/profile/cartProfile";
import Achevment from "../../components/profile/Achevment";
import MatchHestory from "../../components/profile/matchHestory";
import axios from "axios";
import { useEffect, useState } from "react";
import FakeData from "../../data.json";
import blocked from "../../public/images/banned-sign.png"
function Profile(props:any) {
  const [userData, setUserData] = useState<any>([]);
  const [usersData, setUsersData] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [gameHistory, seetGameHistory] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>({});
  const [blockedUsers, setBlockedUsers] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/block`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") as string
            }`,
          },
        }
      )
      .then((res) => {
        setBlockedUsers(res.data);
        console.log("BlockedUsers=",res.data)
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, []);

  useEffect(() => {
    const response: any = axios
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
      })
      .catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    })
  }, []);


  useEffect(() => {
    const data = { userName: router.query.id };
    axios
      .post(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},})
      .then((res) => {
        setUserData(res.data);
        seetGameHistory(res.data.gameHistory);
        console.log("usersData=", res.data);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
    axios.get("http://localhost:3001/friends/all", {headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`,},})
    .then((res) => {
      setUsersData(res.data);
    })
    // }
  }, [update, router.query.id]);
  let filtredData = usersData?.all_users?.filter((value: any) => {
    return value.userName === router.query.id;
  })[0];
  const isBlocked = (userName: any) => {
    let isBlocked: boolean = false;
    blockedUsers?.map((e:any) => {
      console.log(e)
      if (e.userName === userName)
        isBlocked = true;
    })
    return isBlocked;
  }
  return (
    <>
      <div className={!isBlocked(router.query?.id) ? Style.container : Style.containerBlured}>
        <div className={!isBlocked(router.query?.id) ? Style.displaynone : Style.isBlocked}></div>
      <div className={Style.container2}>
      <CartProfile
          data={userData?.userInfo}
          usersdata={usersData?.all_users}
          status={false}
          usersSinvite={usersData?.user_sinvite}
          usersRinvite={usersData?.user_rinvite}
          friends={usersData?.user_friends}
          setUpdate={setUpdate}
          update={update}
          Myprofile={false}
          socket={props.socket}
          user={userInfo}
          blocked={blockedUsers}
          />
          <Achevment />
          </div>
          <div className={Style.matchH}>
          <MatchHestory gameHistory={gameHistory} friends={false} />
          {/* userdata={''} gameHistory={} */}
          </div>
          </div>
          <div className={isBlocked(router.query?.id) ? Style.BlockedUserProfile : Style.displaynone}>
            <img src={blocked.src} alt="" className={Style.blockedImg} />
            <div className={Style.textContainer}>
              <p className={Style.blockedUser}>You've blocked this user</p>
              <p className={Style.blockedUser2}>You won't see any information from this user on Disques of discussions, notifications, and more.</p>
            </div>
            <button className={Style.blockedBtn} onClick={(e:any) => {router.push("/users/blocked")}} >Manage blocked users</button>
          </div>
          </>
    );
}
        
export default Profile;
        