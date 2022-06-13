import style from "../../styles/profile/cartProfile.module.css";
import image from "../../public/images/profile.jpg";
import ajout from "../../public/images/ajouter.png";
import blocked from "../../public/images/blockUser.png";
import play from "../../public/images/tennis1.png";
import chatIcon from "../../public/images/chat1.png";
import axios from "axios";
import accept from "../../public/images/usersImages/accept.png";
import reject from "../../public/images/usersImages/reject.png";
import { useRouter } from "next/router";
import ErrorType from "../AllError/ErrorType";
function CartProfile(props: any) {
  const router = useRouter()
  let isConected = false;
  const route = useRouter();
  const CheckIfFriend = (user: any) => {
    let friendstest = false;
    props.friends?.map((e: any) => {
      if (e?.userName === user) friendstest = true;
    });
    return friendstest;
  };
  const CheckIfInviteRecive = (user: any) => {
    let isInvite = false;
    props.usersRinvite?.map((e: any) => {
      if (e?.userName === user) isInvite = true;
    });
    return isInvite;
  };
  const CheckIfInviteSend = (user: any) => {
    let isInvite = false;
    props.usersSinvite?.map((e: any) => {
      if (e?.userName === user) isInvite = true;
    });
    return isInvite;
  };
  let checkFriends: boolean;
  let checkInviteRecive: boolean;
  let checkInviteSend: boolean;
  return (
    <div className={style.cartPf}>
      <img
        className={style.img}
        id={props.data?.userName}
        src={props.data?.picture}
      />
      <div className={style.formationCart}>
        <div className={style.child1}>
          <p
            className={
              props.Myprofile
                ? style.none
                : props.data?.isActive
                ? style.online
                : style.offline
            }
          >
            {" "}
            {props.data?.isActive ? "Online" : "Offline"}
          </p>
        </div>
        <div className={style.child2}>
          <p className={style.Ptext}>UserName:</p>
          <p className={style.Ptext2}>{props.data?.userName}</p>
        </div>
        <div className={style.child3}>
          <p className={style.Ptext}>Country:</p>
          <p className={style.Ptext2}>{props.data?.country}</p>
        </div>
        <div className={style.child4}>
          <div className={style.childwin}>
            <p className={style.Ptext}>WinMatch: </p>
            <p className={style.allWinLuse}>{props.data?.winMatch}</p>
          </div>
          <div className={style.childwin}>
            <p className={style.Ptext}>LuserMatch: </p>
            <p className={style.allWinLuse}>{props.data?.loserMatch}</p>
          </div>
        </div>
      </div>
      <div className={style.addPlock}>
        {(checkFriends = CheckIfFriend(props.data?.userName))}
        {(checkInviteRecive = CheckIfInviteRecive(props.ƒisdata?.userName))}
        {(checkInviteSend = CheckIfInviteSend(props.data?.userName))}
        <img
          src={ajout.src}
          id={props.data?.userName}
          className={
            props.Myprofile
              ? style.none
              : checkInviteRecive
              ? style.none
              : checkInviteSend
              ? style.none
              : checkFriends
              ? style.none
              : style.ajoute
          }
          onClick={(e: any) => {
            const data = { recipent_id: `${props.data?.userName}` };
            const notData = { reciverName: `${props.data?.userName}`, type : "invit" };

            props.socket?.emit("notification", notData);
            axios
              .post(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/send`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
              .then((res) => {
                props.setUpdate(!props.update);
              })
              .catch(function (error) {
                if (error.response){
                  router.push({pathname :`/errorPage/${error.response.status}`})
                }
              });
          }}
        ></img>
        <img
          src={blocked.src}
          className={props.Myprofile ? style.none : style.block}
          onClick={() => {
            const data = { userName: `${props.data?.userName}` };
            axios
              .post(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/block`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
              .catch(function (error) {
                if (error.response){
                  router.push({pathname :`/errorPage/${error.response.status}`})
                }
              });
          }}
        ></img>
        <img
          src={play.src}
          className={props.Myprofile ? style.none : style.play}
          onClick={()=>{
            const notData = { reciverName: `${props.data?.userName}`, type : "playe" };
            props.socket?.emit("notification", notData);
          }}
        ></img>
        <img
          src={chatIcon.src}
          className={props.Myprofile ? style.none : style.play}
        ></img>
        <img
          src={accept.src}
          alt="accept"
          id={props.data?.userName}
          className={
            props.inBlock
              ? style.none
              : checkInviteRecive && !checkFriends
              ? style.acceptInvite
              : style.none
          }
          onClick={(e: any) => {
            const data = { sender_id: `${props.data?.userName}` };
            axios
              .post(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/accept`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
              .catch(function (error) {
                if (error.response) {
                  router.push({pathname :`/errorPage/${error.response.status}`})
                }
              });
            props.setUpdate(!props.update);
          }}
        />
        <img
          src={reject.src}
          width={20}
          height={20}
          alt="reject"
          id={props.data?.userName}
          className={
            props.inBlock
              ? style.none
              : checkInviteRecive && !checkFriends
              ? style.rejectInvite
              : checkInviteSend
              ? style.rejectInvite
              : style.none
          }
          onClick={(e: any) => {
            const data = { recipent_id: `${e.target.id}` };
            axios
              .post(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/cancell`,
                data,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
              .catch(function (error) {
                if (error.response) {
                  router.push({pathname :`/errorPage/${error.response.status}`})
                }
              });
            props.setUpdate(!props.update);
          }}
        />
        {(checkFriends = false)}
        {(checkInviteRecive = false)}
        {(checkInviteSend = false)}
      </div>
    </div>
  );
}

export default CartProfile;
