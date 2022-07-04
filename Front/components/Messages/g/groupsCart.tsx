import styles from '../../../styles/messages/friends.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../../public/images/profile.jpg'
import { Dispatch, SetStateAction, FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../../public/images/image.jpeg'
import networking from '../../../public/images/teamwork.png'

const FriendsCart = (props:any) => {
    let info : any = [];
    return (
        <>
        {
        props.data?.map((e: any) => {
            // console.log(e);
            return  (
                <Link href={`/messages/g/${e.id}?name=${e.name}`} key={Math.random()}>
                    <div className={styles.userCard} onClick={(e:any) => {props.setShow(false)}} key={Math.random()}>
                        <div className={styles.imgFriendsContainer}>
                            <img src={networking.src} width={60} height={60} className={styles.profileImage}/>
                            <div className={e.isActive ? styles.friendsStatusOnline : styles.friendsStatusOffline}></div>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.name}</p>
                        </div>
                        {/* <div className={styles.status}>
                            <p>{e.isActive ? "Online" : "Offline"}</p>
                        </div> */}
                        <div className={styles.LastMessage}>
                            <p>This is last message fdsfsddsdsadsaad</p>
                        </div>
                    </div>
                </Link>
            );
        })
    }
    {
    props.PrivateData?.map((e: any) => {
        // console.log(e);
        return  (
            <Link href={`/messages/g/${e.id}?name=${e.name}`} key={Math.random()}>
                <div className={styles.userCard} onClick={(e:any) => {props.setShow(false)}} key={Math.random()}>
                    <div className={styles.imgFriendsContainer}>
                        <img src={networking.src} width={60} height={60} className={styles.profileImage}/>
                        <div className={e.isActive ? styles.friendsStatusOnline : styles.friendsStatusOffline}></div>
                    </div>
                    <div className={styles.userName}>
                        <p>{e.name}</p>
                    </div>
                    {/* <div className={styles.status}>
                        <p>{e.isActive ? "Online" : "Offline"}</p>
                    </div> */}
                    <div className={styles.LastMessage}>
                        <p>This is last message fdsfsddsdsadsaad</p>
                    </div>
                </div>
            </Link>
            );
        })
        }
        </>
    );
}

export default FriendsCart;