import styles from '../../styles/users/users.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import users from '../../pages/users';
import image from '../../public/images/profile.jpg'
import iconSearch from '../../public/images/search.png'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import UsersCart from './UsersCart'

const Blocked = (props:any) => {
    const [filterData, setFilterData] = useState<any>(props.usersData);useEffect(() => {setFilterData(props.usersData);},[props.userData]);
    // console.log(filterData);
    const [userStatus, setStatus] = useState<boolean>(false);
    // let userStatus: boolean = true;
    const router = useRouter();
    const handleChange = (e: any) : void => {
        const searchWord: string = e.target.value;
        const newFilter = props.usersData.filter((value: any) => {
            return (value.userName.includes(searchWord));
        });
        setFilterData(newFilter);
        // console.log("filterData = ",newFilter);
    }
    const handleClick = (e: any) : void => { e.preventDefault(); }
    const ChangeStatus = (e: any) => {
        userStatus ? setStatus(false) : setStatus(true);
    }
    return (
        <div className={styles.globalContainer}>
        <div className={styles.container}>
            <div className={styles.SearchBar}>
                {/* <button className={userStatus? styles.buttonStatusOFF : styles.buttonStatusOn} onClick={(e:any) => ChangeStatus(e, )}>{userStatus? "Offline" : "Online"}</button> */}
                <form action="" className={styles.Form}>
                    <input type="search" placeholder={props.placeholder} className={styles.SearchInput}  onChange={(e: any) => handleChange(e, )}/>
                    {/* <input type="image" name="submit" src={iconSearch.src} onClick={handleClick} className={styles.searchButton}/> */}
                </form>
            </div>
            <div className={styles.child}>
                <UsersCart data={filterData}
                status={false}
                usersSinvite={props.usersSinvite}
                usersRinvite={props.usersRinvite}
                friends={props.friends}
                setUpdate={props.setUpdate}
                inBlock={props.inBlock}
                update={props.update} />
            </div>
        </div>
        </div>
    );
}

export default Blocked;