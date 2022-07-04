import styles from "../../styles/users/usersCard.module.css";
import Image from "next/image";
import Link from "next/link";
import image from "../../public/images/profile.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import addUser from "../../public/images/usersImages/add-user.png";
import chatting from "../../public/images/usersImages/chatting.png";
import { useRouter } from "next/router";
import profileIcon from "../../public/images/profile.jpg";
import blockUser from "../../public/images/usersImages/block-user.png";
import accept from "../../public/images/usersImages/accept.png";
import reject from "../../public/images/usersImages/reject.png";
import users from "../../pages/users";
import ErrorType from "../AllError/ErrorType";

const UsersCart = (props: any) => {
  const [myData, setData] = useState<any>(props.data);
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    setData(props.data);
  });
  const CheckIfFriend = (user: any) => {
    let friendstest = false;
    props.friends?.map((e: any) => {
      if (e.userName === user.userName) friendstest = true;
    });
    return friendstest;
  };
  const CheckIfInviteRecive = (user: any) => {
    let isInvite = false;
    props.usersRinvite?.map((e: any) => {
      if (e.userName === user.userName) isInvite = true;
    });
    return isInvite;
  };
  const CheckIfInviteSend = (user: any) => {
    let isInvite = false;
    props.usersSinvite?.map((e: any) => {
      if (e.userName === user.userName) isInvite = true;
    });
    return isInvite;
  };
  let checkFriends: boolean;
  let checkInviteRecive: boolean;
  let checkInviteSend: boolean;
  return (
    <>
      {props.data?.map((e: any | any[]) => {
        if (typeof window !== "undefined") {
          if (
            localStorage.getItem("accessToken") === null ||
            localStorage.getItem("accessToken") === "undefined" ||
            localStorage.getItem("accessToken") === ""
          )
            axios
              .post(
                `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/users/profile`,
                { userName: e.userName },
                {
                  headers: {
                    Authorization: `Bearer ${
                      localStorage.getItem("accessToken") as string
                    }`,
                  },
                }
              )
              .then((res) => {
                setStatus(res.data.isActive);
              })
              .catch(function (error) {
                if (error.response) {
                  router.push({pathname :`/errorPage/${error.response.status}`})
                }
              });
        }
        return (
          <div className={styles.userCard} key={Math.random()}>
            <div className={`${styles.imgContainer}`}>
              <Link href={`/users/${e.userName}`} key={Math.random()}>
                <img
                  src={e.picture}
                  width={80}
                  height={80}
                  className={`${styles.profileImage} ${
                    status ? styles.userStatusOn : styles.userStatusOff
                  }`}
                />
              </Link>
            </div>
            <div className={styles.userName}>
              <p>{e.userName}</p>
            </div>
            <div className={styles.icons}>
              {(checkFriends = CheckIfFriend(e))}
              {(checkInviteRecive = CheckIfInviteRecive(e))}
              {(checkInviteSend = CheckIfInviteSend(e))}
              <img
                src={addUser.src}
                alt="add"
                id={e.userName}
                className={
                  props.inBlock
                    ? styles.none
                    : checkInviteRecive
                    ? styles.none
                    : checkInviteSend
                    ? styles.none
                    : checkFriends
                    ? styles.none
                    : styles.addUserIcon
                }
                onClick={(e: any) => {
                  const data = { recipent_id: `${e.target.id}` };
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
                    .catch(function (error) {
                      if (error.response) {
                        router.push({pathname :`/errorPage/${error.response.status}`})
                      }
                    });
                  props.setUpdate(!props.update);
                }}
              />
              <img
                src={accept.src}
                alt="accept"
                id={e.userName}
                className={
                  props.inBlock
                    ? styles.none
                    : checkInviteRecive && !checkFriends
                    ? styles.acceptInvite
                    : styles.none
                }
                onClick={(e: any) => {
                  const data = {
                    sender_id: `${e.target.id}`,
                  };
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
                id={e.userName}
                className={
                  props.inBlock
                    ? styles.none
                    : checkInviteRecive && !checkFriends
                    ? styles.rejectInvite
                    : checkInviteSend
                    ? styles.rejectInvite
                    : styles.none
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
              {(checkInviteRecive = false)}
              {(checkInviteSend = false)}
              {(checkFriends = false)}
              <Link href={`/messages/${e.userName}`}>
                <img
                  src={chatting.src}
                  alt="chat"
                  className={props.inBlock ? styles.none : styles.chattingIcon}
                />
              </Link>
              <img
                src={blockUser.src}
                alt="add"
                id={e.userName}
                className={props.inBlock ? styles.addUserIcon : styles.none}
                onClick={(e: any) => {
                  const data = { userName: `${e.target.id}` };
                  axios
                    .post(
                      `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/unblock`,
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
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UsersCart;
