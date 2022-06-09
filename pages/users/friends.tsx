import Friends from "../../components/users/Friends";
import React, { Component } from "react";
import FakeFriendsData from "../../dataFriend.json";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/users/users.module.css";

const friends = () => {
  const [usersData, setUsersData] = useState<any>([]);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    try {
      const rest = axios
        .get(
          `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/friends/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setUsersData(res.data);
        });
    } catch (res: any) {}
  }, [update]);
  return (
    <div>
      <Friends
        placeholder="Search..."
        usersData={usersData?.user_friends}
        usersSinvite={usersData?.user_sinvite}
        usersRinvite={usersData?.user_rinvite}
        friends={usersData?.user_friends}
        setUpdate={setUpdate}
        inBlock={false}
        update={update}
      />
    </div>
  );
};

export default friends;
