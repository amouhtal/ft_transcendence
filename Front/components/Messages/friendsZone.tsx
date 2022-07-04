import { FiSearch } from "react-icons/fi";
import { MdAddComment } from "react-icons/md"
import FriendsCart from './friendsCart';
import styles from '../../styles/messages/messages.module.css'
import img from '../../public/images/plus.png'
import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import image from '../../public/images/profile.jpg'
import stylesfriends from '../../styles/messages/friends.module.css'
import axios from "axios";

const FriendsZone = (props:any) => {
    const [ContactInformation, setContatInformation] = useState<any>([]);
    let FriendsInformation: any = [];
    return (
        <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" name="" id="" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.creatNewGrp}>
                <p>Creat New Groupe</p>
                <img src={img.src} className={styles.creatIcon}/>
            </div>
            <div className={styles.friendscard}>
                <FriendsCart data={props.data} status={props.status} setShow={props.setShow}/>
            </div>
        </div>
    );
}

export default FriendsZone;