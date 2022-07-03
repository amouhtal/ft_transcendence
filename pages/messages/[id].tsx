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
    var test:boolean = true;
    return (
        <div className={styles.globaleContainer}>
            <div className={styles.bcontainer}>
                <ChatZone status={Status} socket={props.socket} user={userInfo}/>
            </div>
        </div>
    );
}

export default Messages;
