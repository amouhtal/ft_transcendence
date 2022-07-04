import Users from "../../components/users/Users";
import React, { Component } from "react";
import FakeData from "../../data.json";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/users/users.module.css";
import {useRouter} from 'next/router';

function users() {
  const [usersData, setUsersData] = useState<any>();
  let x: number = 0;
  const router = useRouter()
  const [count, setCount] = useState(0);
  const [update, setUpdateVar] = useState<boolean>(false);
  console.log(process.env.NEXT_PUBLIC_IP_ADRESSE)
  useEffect(() => {
    axios
      .get(`http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
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
      <Users
        placeholder="Search..."
        usersData={usersData?.all_users}
        usersSinvite={usersData?.user_sinvite}
        usersRinvite={usersData?.user_rinvite}
        friends={usersData?.user_friends}
        setUpdate={setUpdateVar}
        inBlock={false}
        update={update}
      />
    </div>
  );
}

export default users;
