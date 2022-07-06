import styles from '../../styles/messages/friends.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../public/images/profile.jpg'
import { Dispatch, SetStateAction, FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const FriendsCart = (props:any) => {
    let info : any = [];
    const router = useRouter();
    const isBlocked = (userName:string) => {
        let on = false;
        props.blockedusers?.map((e:any) => {
            if (e.userName === userName)
                on = true;
        })
        return on;
    }
    return (
        <>
        {props.data?.map((e: any) => {
            if (!isBlocked(e.userName))
            {
                return  (
                    <Link href={`/messages/${e.userName}`} key={Math.random()}>
                    <div className={styles.userCard} id={e.userName} onClick={(e:any) => {props.setShow(false);}} key={Math.random()}>
                    <div className={styles.imgFriendsContainer}>
                    <img src={e.picture} width={60} height={60} className={styles.profileImage}/>
                    <div className={e.isActive ? styles.friendsStatusOnline : styles.friendsStatusOffline}></div>
                    </div>
                    <div className={styles.userName}>
                    <p>{e.userName}</p>
                    </div>
                    <div className={styles.status}>
                    <p>{e.isActive ? "Online" : "Offline"}</p>
                    </div>
                    <div className={styles.LastMessage}>
                    <p>This is last message fdsfsddsdsadsaad</p>
                    </div>
                    </div>
                    </Link>
            );
        }
        })}
        </>
    );
}

export default FriendsCart;