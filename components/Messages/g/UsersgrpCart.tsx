import styles from '../../../styles/users/usersCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../../public/images/profile.jpg'
import axios from 'axios'
import { useEffect, useState } from 'react'
import addUser from '../../../public/images/usersImages/add-user.png'
import chatting from '../../../public/images/usersImages/chatting.png'
import { useRouter } from 'next/router'
import profileIcon from '../../../public/images/profile.jpg'
import blockUser from '../../../public/images/usersImages/block-user.png'
import accept from '../../../public/images/usersImages/accept.png'
import reject from '../../../public/images/usersImages/reject.png'
import users from '../../../pages/users'

const UsersCart = (props:any) => {
    const [myData, setData] = useState<any>(props.data);
    const router = useRouter();
    const [status, setStatus] = useState<boolean>(false);
    const [Checked, setChecked] = useState<boolean>(false);
    const [choosen, setChoosen] = useState<any>([]);
    useEffect(() => {
        setData(props.data)
    })

    let friends:any= [];
    const CheckIfUserExist =  (e:any):any => {
        let isExist:boolean = false;
        props.usersChoosen.map((el:any) => {
            if (el.userName === e)
                isExist = true;
        })
        return isExist;
    }
    const handelClick = (e:any) => {
        console.log("userNameNN =",e.target.id);
        const isHere: boolean = CheckIfUserExist(e.target.id.split('%')[0]);
        if (isHere === false)
        {
            friends = props.usersChoosen;
            friends.push({userName:e.target.id.split('%')[0],picture:e.target.id.split('%')[1]});
            props.setChoosenUsers(friends);
            props.setUpdate(!props.update);
        }
        else
        {
            friends = [];
            friends = props.usersChoosen.filter((el:any) => {
                return (el.userName !== e.target.id.split("%")[0])
            })
            props.setChoosenUsers(friends);
            props.setUpdate(!props.update)
        }
    }
    return (
        <>
        {props.data?.map((e: any | any[]) => {
                // if (typeof window !== 'undefined') {
                //     if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === "undefined" || localStorage.getItem("accessToken") === '')
                //     {
                //         axios.post('http://10.12.10.5:3000/users/profile',{userName : e.userName},{
                //             headers:{
                //                 'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`
                //             }
                //         }).then((res) =>{
                //             setStatus(res.data.isActive);
                //             setChecked(false);
                //         })
                //     }
                // }
                return  (
                    <div className={styles.userCard} id={`${e.userName}%${e.picture}`} key={Math.random()} onClick={(e:any) => handelClick(e)} >
                    {/* {console.log(`userNamePP = ${e.userName}%${e.picture})`)} */}
                        <div className={`${styles.imgContainer}`}>
                            <Link href={`/users/${e.userName}`} key={Math.random()}>
                                <img src={e?.picture} width={80} height={80} className={`${styles.profileImage} ${status ?styles.userStatusOn : styles.userStatusOff}`}/>
                            </Link>
                        </div>
                        <div className={styles.userName}>
                            <p>{e.userName}</p>
                        </div>
                        <div className={styles.icons}>
                            <input type="radio" checked={Checked ? true : false}/>                    
                        </div>
                    </div>
            );
        })}
        </>
    );
}

export default UsersCart;