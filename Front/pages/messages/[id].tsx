import styles from '../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Friends from '../../dataFriend.json'
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../components/Messages/UserInfo';
// const socket = io("10.12.11.5:3000",{transports:['websocket']});
import ChatZone from '../../components/Messages/chatZone';
import axios from 'axios';
const Messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [userInfo ,setUserInfo] = useState<any>();
    const [blockedUsers, setBlockedUsers] = useState<any>([]);
    const [isBlocked, setisBlocked] = useState<boolean>(false);
	const [updateIsBlocked, setUpdateIsBlocked] = useState<boolean>(false);

	const userNameFromUrl: string = typeof window != "undefined" ? window.location.href.split("/")[4] : "";
	console.log("userNameFrom Url=",userNameFromUrl,"id==",router.query.id);

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
            console.log("BlockedUsers=",res.data);
			res.data.map((e:any) => {
				if (e.userName === userNameFromUrl)
					setisBlocked(true);
		  })
          }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        });

      }, [updateIsBlocked]);
    var test:boolean = true;

    useEffect(() => {

    }, [])
    return (
        <div className={styles.globaleContainer}>
            <div className={styles.bcontainer}>
                <ChatZone status={Status} socket={props.socket} user={userInfo} blockedusers={blockedUsers} isBlocked={isBlocked}/>
            </div>
        </div>
    );
}

export default Messages;
