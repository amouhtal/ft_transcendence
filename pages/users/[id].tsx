import Style from "../../styles/profile/Profile.module.css";
import userData from "../../data.json";
import { useRouter } from "next/router";
import CartProfile from "../../components/profile/cartProfile";
import Achevment from "../../components/profile/Achevment";
import MatchHestory from "../../components/profile/matchHestory";
import axios from "axios";
import { useEffect, useState } from "react";
import FakeData from "../../data.json";

function Profile(props:any) {
  const [usersData, setUsersData] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [gameHistory, seetGameHistory] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const data = { userName: router.query.id };
    // if (typeof window !== 'undefined') {
    //     if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined" || localStorage.getItem("accessToken") === '')
    axios
      .post(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setUsersData(res.data);
        seetGameHistory(res.data.gameHistory);
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
    // }
  }, [update, router.query.id]);
  let filtredData = usersData?.all_users?.filter((value: any) => {
    return value.userName === router.query.id;
  })[0];
  return (
    <div className={Style.container}>
      <div className={Style.container2}>
        <CartProfile
          data={usersData?.userInfo}
          usersdata={usersData?.all_users}
          status={false}
          usersSinvite={usersData?.user_sinvite}
          usersRinvite={usersData?.user_rinvite}
          friends={usersData?.user_friends}
          setUpdate={setUpdate}
          update={update}
          Myprofile={false}
          socket={props.socket}
        />
        <Achevment Myprofile={false}/>
      </div>
      <div className={Style.matchH}>
        <MatchHestory gameHistory={gameHistory} friends={false} />
        {/* userdata={''} gameHistory={} */}
      </div>
    </div>
  );
}

export default Profile;
