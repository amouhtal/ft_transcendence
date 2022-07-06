import styles from '../../../styles/messages/index.module.css'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Friends from '../../../dataFriend.json'
import Router, { useRouter } from 'next/router';
import GroupsZone from '../../../components/Messages/g/GroupsZone';
import Image from 'next/image';
import image from '../../public/images/profile.jpg'
import UserInfo from '../../../components/Messages/UserInfo';
import ChatZone from '../../../components/Messages/chatZone';
import UserInfoPopup2 from '../../../components/UserInfoPopup/UserInfoPopup2'
import {useSelector} from 'react-redux'
import axios from 'axios';

const messages = (props:any) => {
    const [Status ,setStatus] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(true);
    const [groups, setGroups] = useState<any>();


    const test:any = useSelector<any>(state=>state);
    return (
        <>
            <div className={styles.globaleContainer}>
                <button className={styles.tmp} onClick={(e:any) => {e.preventDefault();setStatus(!Status)}}>Status</button>
                <div className={styles.container}>
                    <GroupsZone data={groups} Info={groups} status={Status} show={showFriends} setShow={setShowFriends} socket={props.socket}/>
                    <div className={styles.indexWelcomeZone}>
                        <h1 className={styles.indexWelcomeSentence}>Welcome To ft_transcendance Groups Chat</h1>
                    </div>
                </div>
            </div>
            {test.sizes_.zak_test && <UserInfoPopup2 />}
        </>
    );
}

export default messages;