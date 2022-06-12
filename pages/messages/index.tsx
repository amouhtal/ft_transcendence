import styles from '../../styles/messages/index.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Friends from '../../dataFriend.json'
import Router, { useRouter } from 'next/router';
import FriendsZone from '../../components/Messages/friendsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../components/Messages/UserInfo';
import ChatZone from '../../components/Messages/chatZone';
import UserInfoPopup2 from '../../components/UserInfoPopup/UserInfoPopup2'
import {useSelector} from 'react-redux'
import axios from 'axios';
const messages = () => {
    const [Status ,setStatus] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const router = useRouter();
    const [filterData] = Friends.filter((value: any) => {
        return (value.first_name === router.query.id);
    });
    const [ContactInformation, setContatInformation] = useState<any>([]);
    const [friends, setFriends] = useState<any>();
    let FriendsInformation: any = [];

    useEffect(() => {
        axios.get("http://10.12.10.4:3300/message/getConntacts",
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setFriends(res.data);
        }).catch(function (error){
            if (error.response){
                router.push({pathname :`/errorPage/${error.response.status}`})
            }
        })
    }, [])
    const test:any = useSelector<any>(state=>state);
    return (
        <>
            <div className={styles.globaleContainer}>
                <button className={styles.tmp} onClick={(e:any) => {e.preventDefault();setStatus(!Status)}}>Status</button>
                <div className={styles.container}>
                    <FriendsZone data={friends} Info={friends} status={Status} show={showFriends} setShow={setShowFriends}/>
                    <div className={styles.indexWelcomeZone}>
                        <h1 className={styles.indexWelcomeSentence}>Welcome To ft_transcendance Chat</h1>
                    </div>
                </div>
            </div>
            {test.sizes_.zak_test && <UserInfoPopup2 />}
        </>
    );
}

export default messages;