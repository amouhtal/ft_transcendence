import styles from "../../styles/messages/ChatZone.module.css";
import Image from "next/image";
import image from "../../public/images/profile.jpg";
import { BsThreeDots } from "react-icons/bs";
import { GrSend } from "react-icons/gr";
import { MdUploadFile } from "react-icons/md";
import img from "../../public/images/send.png";
import clip from "../../public/images/paperclip.png";
import send from "../../public/images/send-message.png";
import { useEffect, useRef, useState } from "react";
import UserInfo from "./UserInfo";
import io from "socket.io-client";
import FriendsZone from "../../components/Messages/friendsZone";
import back from "../../public/images/left.png";
import axios from "axios";
import { Router, useRouter } from "next/router";
import typing from "../../public/images/typing.gif";
import blocked from "../../public/images/banned-sign.png"
import blank from "../../public/images/blank-profile-picture.png"

const ChatZone = (props: any) => {
  const router = useRouter();
  const checkout: string = process.browser
    ? (localStorage.getItem("color") as string)
    : "default";
  const [messageValue, setMessage] = useState<string>("Hello how are you?");
  const [update, setUpdate] = useState<boolean>(true);
  const [AllMessages, setAllMessages] = useState<any>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const [updateFriendsList, setUpdateFriendsList] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/message/getConnversation",
        { userName: router.query.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setMessages(res.data);
        setAllMessages(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          router.push({ pathname: `/errorPage/${error.response.status}` });
        }
      });

    dummy.current.scrollIntoView();
  }, [router.query.id]);
  const [userInfo, setuserInfo] = useState<boolean>(false);
  const [showFriends, setShowFriends] = useState<boolean>(true);
  const [friends, setFriends] = useState<any>();
  const [color, setColor] = useState<string>(checkout);
  const [reciverId, setReciverId] = useState<any>();
  const [usersData, setUsersData] = useState<any>([]);
  const dummy: any = useRef<any>();
  const dummy2: any = useRef<any>();
  useEffect(() => {
    // dummy.current.scrollIntoView();
    if (messages !== []) {
      const userName = messages[0]?.senderId === props.user?.userName ? "" : messages[0]?.reciverId;
      axios
        .post(
          "http://localhost:3001/users/profile",
          { userName: router.query.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setReciverId(res.data?.userInfo);
        })
        .catch(function (error) {
          if (error.response) {
            router.push({ pathname: `/errorPage/${error.response.status}` });
          }
        });
    }
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/message/getConntacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setFriends(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          router.push({ pathname: `/errorPage/${error.response.status}` });
        }
      });
      axios.get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUsersData(res.data.all_users);
      })
      .catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, []);
  const handelSubmit = (e: any) => {
    e.preventDefault();
    if (e.target.message.value !== "") {
      e.target.message.value !== ""
        ? setMessage(e.target.message.value)
        : messageValue;
      props.socket?.emit("message", e.target.message.value, router.query?.id);
      e.target.message.value = "";
	  setUpdateFriendsList(!updateFriendsList)
    }
  };
  if (process.browser) localStorage.setItem("color", color as string);
  props.socket?.on("message", (data: any) => {
    setMessages(data);
  });
  const isBlocked = (userName: any) => {
    let isBlocked: boolean = false;
    props.blockedusers?.map((e:any) => {
      if (e.userName === userName)
        isBlocked = true;
    })
    return isBlocked;
  }
  const isNotInUsers = (userName:string) => {
    let isNotValidUser: boolean = true;
    usersData?.map((e:any) => {
        if (e.userName === userName)
          isNotValidUser = false;
    })
    props.blockedusers.map((e:any) => {
      if (e.userName === userName)
        isNotValidUser = false;
    })
    return isNotValidUser;
  }
  return (
    <>
      <FriendsZone
        data={friends}
        status={props.status}
        show={showFriends}
        setShow={setShowFriends}
        socket={props.socket}
        updateFriendsList={updateFriendsList}
        setUpdateFreindsList={setUpdateFriendsList}
		    blockedusers={props.blockedusers}
      />
      <div className={props.isBlocked || isNotInUsers(router.query.id as string) ? (userInfo ? styles.chatZoneBlured : styles.fullChatZoneBlured) : (userInfo ? styles.chatZone : styles.fullChatZone)}>
		<div className={props.isBlocked ? styles.blockContaint : isNotInUsers(router.query.id as string) ? styles.blockContaint : styles.none}></div>
        <div className={styles.chatHeader}>
          <img
            src={back.src}
            className={styles.showFriendsZone}
            onClick={(e: any) => {
              e.preventDefault();
              setShowFriends(!showFriends);
            }}
          />
          <div className={styles.imgHeaderContainer}>
            <img src={blank.src} className={styles.img} />
            <img src={reciverId?.picture} className={styles.img} />
            <div
              className={
                reciverId?.isActive
                  ? styles.HeaderStatusOnline
                  : styles.HeaderStatusOffline
              }
            ></div>
          </div>
          <p className={styles.fullName}>{reciverId?.userName}</p>
          <p className={styles.status}>
            {reciverId?.isActive ? "Online" : "Offline"}
          </p>
          <p
            className={styles.settings}
            onClick={(e: any) => {
              setuserInfo(!userInfo);
            }}
          >
            <BsThreeDots className={styles.settingsIcon} />
          </p>
        </div>
        <div className={styles.chatMain}>
          {messages?.map((e: any) => {
            e.time = e.time.replace("T", " ");
            e.time = e.time.replace("Z", "");
            e.time = e.time.split(".")[0];
            const userName =
              e.senderId === props.user?.userName ? e.reciverId : e.senderId;
            return (
              <div
                className={
                  e.senderId === props.user?.userName
                    ? styles.left
                    : styles.right
                }
                id="lastMessage"
              >
                <img
                  src={
                    e.senderId === props.user?.userName
                      ? props.user?.picture
                      : reciverId?.picture
                  }
                  className={
                    e?.senderId === props.user?.userName
                      ? styles.imgRight
                      : styles.imgLeft
                  }
                  alt=""
                />
                <div
                  id="container"
                  className={`${
                    e.senderId === props.user?.userName
                      ? styles.messageSenderContainer
                      : styles.messageReciverContainer
                  }
                        ${
                          e.senderId === props.user?.userName
                            ? color === "black"
                              ? styles.messageContainerBlack
                              : color === "pink"
                              ? styles.messageContainerPink
                              : color === "blue"
                              ? styles.messageContainerBlue
                              : styles.none
                            : styles.gray
                        }`}
                >
                  <p className={`${styles.messageChatMain}`}>{e.message}</p>
                  <p
                    className={
                      e.senderId === props.user?.userName
                        ? styles.TimeRight
                        : styles.TimeLeft
                    }
                  >
                    {e.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={dummy}></div>
        </div>
        <div className={styles.messagesZone}>
          <form className={styles.formMessage} onSubmit={handelSubmit}>
            <input
              type="text"
              name=""
              id="message"
              placeholder="Type a message here..."
              className={styles.message}
            />
            <button
              type="submit"
              className={styles.btn}
              onSubmit={(e: any) => {
                e.preventDefault();
                e.target.value = "";
              }}
            >
              <img src={send.src} className={styles.btnIcon} />
            </button>
            <div className={styles.fileupload}>
              <img src={clip.src} alt="" />
              <input type="file" name="" id="" />
            </div>
          </form>
        </div>
      </div>
	  <div className={props.isBlocked || isNotInUsers(router.query.id as string) ? styles.BlockedUserProfile : styles.displaynone}>
            <img src={blocked.src} alt="" className={styles.blockedImg} />
            <div className={styles.textContainer}>
              <p className={isNotInUsers(router.query.id as string) ? styles.displaynone : styles.blockedUser}>You've blocked this user</p>
              <p className={isNotInUsers(router.query.id as string) ? styles.displaynone : styles.blockedUser2}>You won't see any information from this user on Disques of discussions, notifications, and more.</p>
              <p className={isNotInUsers(router.query.id as string) ? styles.NotFound : styles.displaynone}>User Not Found</p>
            </div>
            <button className={isNotInUsers(router.query.id as string) ? styles.displaynone : styles.blockedBtn} onClick={(e:any) => {router.push("/users/blocked");}} >Manage blocked users</button>
        </div>
      <UserInfo
        data={reciverId}
        status={reciverId?.isActive}
        allMessages={AllMessages}
        setMessages={setMessages}
        messages={messages}
        display={userInfo}
        color={setColor}
        setDisplay={setuserInfo}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
};
export default ChatZone;
