import { FiSearch } from "react-icons/fi";
import { MdAddComment } from "react-icons/md"
import GroupsCart from './groupsCart';
import styles from '../../../styles/messages/messages.module.css'
import img from '../../../public/images/writing.png'
import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import image from '../../../public/images/profile.jpg'
import stylesfriends from '../../../styles/messages/friends.module.css'
import axios from "axios";
import UsersCart from './UsersgrpCart'
import FakeData from '../../../data.json'
import padlock from '../../../public/images/padlock.png'
import show from '../../../public/images/show.png'
import hidden from '../../../public/images/hidden.png'
import networking from '../../../public/images/teamwork.png'

/*
    -Private UseState : sheck If the room is Private or public : show or not show the room;
    -Protected UseStae: check if the room have a password on None;
*/
const FriendsZone = (props:any) => {
    const [ContactInformation, setContatInformation] = useState<any>([]);
    let FriendsInformation: any = [];
    const router = useRouter();
    const [CreatNewGrp, setCreatNewGrp] = useState<boolean>(false);
    const [Private, setPrivate] = useState<boolean>(false);
    const [usersChoosen, setChoosenUsers] = useState<any>([])
    const [update,setUpdate] = useState<boolean>(false);
    const [Protected, setProtected] = useState<boolean>(false);
    const [GroupName, setGroupName] = useState<string>("");
    const [GourpPassword, setGroupPassword] = useState<string>("");
    const [usersData, setUsersData] = useState<any>(FakeData);
    const [PublicGroupsInfo, setPublicGroupsInfo] = useState<any>();
    const [PrivateGroupsInfo, setPrivateGroupsInfo] = useState<any>();
    const [getRoomsUpdate, setGetRoomsUpdate] = useState<boolean>(false);
    useEffect(() => {
        axios.get("http://localhost:3001/chatRoom/getAllRooms",
        {headers:{'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}}
        ).then((res) => {
            setPublicGroupsInfo(res.data.public);
            setPrivateGroupsInfo(res.data.private);
            
        })
    },[router.query.id,getRoomsUpdate])
    useEffect(() => {
		axios
		  .get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		  })
		  .then((res) => {
			setUsersData(res.data.all_users);
			// console.log("AllUsers=",res.data.all_users);
		  });
	  }, []);
    const handelNameCange = (e:any) => {
        e.preventDefault();
        setGroupName(e.target.value);
    }
    return (
        <div className={props.show ? styles.friendListshow : styles.friendListDontshow}>
            <div className={styles.searchBar}>
                <form action="">
                    <input type="search" name="" id="" className={styles.search} placeholder="Enter for search..."/>
                    <FiSearch className={styles.searchIcon}/>
                </form>
            </div>
            <div className={styles.creatNewGrp}>
                {/* <p>Creat New Groupe</p> */}
                <img src={img.src} className={styles.creatIcon} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp)}} />
            </div>
            <div className={CreatNewGrp ? styles.creatGoupContainerOn : styles.creatGoupContainerOff}>
                <p className={styles.NewGrpP}>New Group</p>
                <button className={styles.btn_create} onClick={(e:any) => {
                    props.socket?.emit("creatChannel",{name:GroupName, type:Private ? "private" : "public", protected:Protected ? true : false,password: Protected ? GourpPassword : null,users: usersChoosen});
                    setCreatNewGrp(!CreatNewGrp);
                    setProtected(false);
                    setChoosenUsers([]);
                    setGetRoomsUpdate(!getRoomsUpdate);
                    }}>Create</button>
                <button className={styles.btn_cancel} onClick={(e:any) => {e.preventDefault();setCreatNewGrp(!CreatNewGrp);setChoosenUsers([])}}>Cancel</button>
                <form action="" className={styles.groupForm}>
                    <input type="text" placeholder="Group name" className={styles.groupName} onChange={handelNameCange}/>
                </form>
                <div className={styles.container}>
                    <label className={styles.switch}>
                    <input type="checkbox" onChange={(e:any) => {setProtected(!Protected)}}/>
                    <div className={`${styles.slider} ${styles.round}`}></div>
                    </label>
                </div>
                <img src={padlock.src} alt="Protected" className={styles.private} />
                <img src={show.src} alt="show" className={Private ? styles.none: styles.showIcon} onClick={(e:any) => {setPrivate(true)}}/>
                <img src={hidden.src} alt="show" className={Private ? styles.showIcon : styles.none} onClick={(e:any) => {setPrivate(false)}}/>
                <input type="text" placeholder="Password..." className={Protected ? styles.Password : styles.none} onChange={(e:any) => {setGroupPassword(e.target.value)}}/>
                <input type="text" placeholder="Search..." className={styles.creatGroupsearch}/>
                <div className={styles.usersAdd}>
                    {
                        usersChoosen.map((e:any) => {
                            return (
                                <div className={styles.users}>
                                    <img src={e.picture} alt="" className={styles.addUsersimg}/>
                                </div>
                            )
                        })
                    }
                </div>
                <p className={styles.Suggested}>SUGGESTED</p>
                <div className={CreatNewGrp ? styles.usersContainer : styles.none}>
                    <UsersCart data={usersData} setChoosenUsers={setChoosenUsers} usersChoosen={usersChoosen} update={update} setUpdate={setUpdate}/>
                </div>
            </div>
            <div className={styles.friendscard}>
                <GroupsCart data={PublicGroupsInfo} PrivateData={PrivateGroupsInfo} status={props.status} setShow={props.setShow} setRoomOwnerUsername={props.setRoomOwnerUsername}/>
            </div>
        </div>
    );
}

export default FriendsZone;