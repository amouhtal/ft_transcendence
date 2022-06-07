import { FiSearch } from "react-icons/fi";
import { MdAddComment } from "react-icons/md";
import GroupsCart from "./groupsCart";
import styles from "../../../styles/messages/messages.module.css";
import img from "../../../public/images/plus.png";
import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import image from "../../../public/images/profile.jpg";
import stylesfriends from "../../../styles/messages/friends.module.css";
import axios from "axios";

const FriendsZone = (props: any) => {
  const [ContactInformation, setContatInformation] = useState<any>([]);
  let FriendsInformation: any = [];
  const [CreatNewGrp, setCreatNewGrp] = useState<boolean>(false);
  const [Public, setPublic] = useState<boolean>(true);
  const [Private, setPrivate] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.Password.value);
    axios
      .post(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/chatRoom/create`,
        {
          name: e.target.groupeName.value,
          type: Public ? "public" : Private ? "private" : "error",
          password: e.target.Password.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res: any) => {
        console.log("res =", res);
      });
  };
  return (
    <div
      className={props.show ? styles.friendListshow : styles.friendListDontshow}
    >
      <div className={styles.searchBar}>
        <form action="">
          <input
            type="search"
            name=""
            id=""
            className={styles.search}
            placeholder="Enter for search..."
          />
          <FiSearch className={styles.searchIcon} />
        </form>
      </div>
      <div className={styles.creatNewGrp}>
        <p>Creat New Groupe</p>
        <img
          src={img.src}
          className={styles.creatIcon}
          onClick={(e: any) => {
            e.preventDefault();
            setCreatNewGrp(!CreatNewGrp);
          }}
        />
        {/* <div className={CreatNewGrp ? styles.groupSettings : styles.none}> */}
        <form
          action=""
          className={CreatNewGrp ? styles.groupSettings : styles.none}
          onSubmit={handleSubmit}
        >
          <div className={styles.boxstyle}></div>
          <p>Goupe Name</p>
          <input
            type="text"
            placeholder=""
            id="groupeName"
            className={styles.GroupeNameInput}
          />
          <label
            className={styles.container}
            onClick={(e: any) => {
              setPublic(true);
              setPrivate(false);
            }}
          >
            Public
            <input type="radio" id="Public" checked={Public ? true : false} />
            <span className={styles.checkmark}></span>
          </label>
          <label
            className={styles.container}
            onClick={(e: any) => {
              setPrivate(true);
              setPublic(false);
            }}
          >
            Private
            <input type="radio" id="Private" checked={Private ? true : false} />
            <span className={styles.checkmark}></span>
          </label>
          <input
            type="text"
            name="Roompassword..."
            id="Password"
            placeholder="password"
            className={Private ? styles.GroupePassword : styles.none}
          />
          <input type="submit" value={"Create"} className={styles.submit_btn} />
        </form>
        {/* </div> */}
      </div>
      <div className={styles.friendscard}>
        <GroupsCart
          data={props.data}
          status={props.status}
          setShow={props.setShow}
        />
      </div>
    </div>
  );
};

export default FriendsZone;
