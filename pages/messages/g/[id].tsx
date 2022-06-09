import styles from '../../../styles/messages/messages.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../../components/Messages/UserInfo';
// const socket = io("10.12.11.5:3000",{transports:['websocket']});
import ChatZone from '../../../components/Messages/chatZone';
import FakeData from '../../../data.json'
import axios from 'axios';
const Messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const router = useRouter();
    const [userInfo ,setUserInfo] = useState<any>();
    // useEffect(() => {
    //     router.push(`/messages/${router.query.id}`)
    // },[])
    var test:boolean = true;

    const [filterData] = FakeData.filter((value: any) => {
        return (value.userName === router.query.id);
    });
    return (
        <div className={styles.globaleContainer}>
            <div className={styles.container}>
                <ChatZone data={filterData} status={Status} socket={props.socket} user={props.user}/>
            </div>
        </div>
    );
}



export default Messages;