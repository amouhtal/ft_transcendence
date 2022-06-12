import Blocked from "../../components/users/Blocked";
import React, { Component } from "react";
import FakeFriendsData from "../../dataFriend.json";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/users/users.module.css";
import { useRouter } from "next/router";
const blocked = (props: any) => {
  const [usersData, setUsersData] = useState<any>([]);
  const [usersDatas, setUsersDatas] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const router = useRouter()
  useEffect(() => {
    axios
      .get(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/block`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("accessToken") as string
            }`,
          },
        }
      )
      .then((res) => {
        setUsersData(res.data);
        // console.log("usersData=",usersData)
      }).catch(function (error){
        if (error.response){
            router.push({pathname :`/errorPage/${error.response.status}`})
        }
    });
  }, [update]);
  return (
    <div>
      <Blocked
        placeholder="Search..."
        usersData={usersData}
        blocked={usersData}
        setUpdate={setUpdate}
        inBlock={true}
        update={update}
      />
    </div>
  );
};

export default blocked;
