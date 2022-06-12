import Style from "../styles/sidePar.module.css";
// import  Profile from './../public/images/profile.jpg';
import Profile from "./../public/images/tennis1.png";
import iconprofil from "./../public/images/imgeSidBar/profile.png";
import iconHome from "./../public/images/imgeSidBar/home.png";
import iconGame from "./../public/images/imgeSidBar/game-controller.png";
import iconLogout from "./../public/images/imgeSidBar/out.png";
import message from "./../public/images/imgeSidBar/email.png";
import Notification from "./../public/images/imgeSidBar/bell.png";
import setting from "./../public/images/imgeSidBar/profileSetting.png";
import friends from "./../public/images/imgeSidBar/group.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
import { update_test } from "../redux/sizes";
import { useDispatch } from "react-redux";
import axios from "axios";
import ErrorType from "./AllError/ErrorType";

function SidePar(props: any) {
  const [isNavBar, setNavBar] = useState<boolean>(false);
  const [UsersInterface, setUsersInterface] = useState<boolean>(false);
  const router = useRouter();
  const test = useSelector<object>((state) => state);
  // console.log(test);
  const dispatch = useDispatch<any>();
  const onclickHandler = () => {
    // console.log(test);
    dispatch(update_test());
  };
  return (
    <>
      <div
        className={
          props.showSidBar
            ? Style.none
            : isNavBar
            ? Style.sideParOn
            : Style.sideParOff
        }
      >
        <div className={Style.container2}>
          <div
            className={Style.child}
            onClick={(e: any) => {
              setUsersInterface(!UsersInterface);
            }}
          >
            <img src={friends.src} className={Style.iconimg} />
            <div className={Style.userInterface}>
              <ul className={Style.usersInterfaceUl}>
                <Link href={`/users`}>
                  <li
                    onClick={(e: any) => {
                      setNavBar(!isNavBar);
                    }}
                  >
                    Users
                  </li>
                </Link>
                <Link href={`/users/friends`}>
                  <li
                    onClick={(e: any) => {
                      setNavBar(!isNavBar);
                    }}
                  >
                    Friends
                  </li>
                </Link>
                <Link href={`/users/blocked`}>
                  <li
                    onClick={(e: any) => {
                      setNavBar(!isNavBar);
                    }}
                  >
                    Blocked
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className={Style.child}>
            <Link href="/home">
              <img
                src={iconHome.src}
                className={Style.iconimg}
                onClick={(e: any) => {
                  setNavBar(!isNavBar);
                }}
              ></img>
            </Link>
          </div>
          <div className={Style.child}>
            <Link href="/profile">
              <img
                src={iconprofil.src}
                className={Style.iconimg}
                onClick={(e: any) => {
                  setNavBar(!isNavBar);
                }}
              ></img>
            </Link>
          </div>
          <div className={Style.child}>
            <Link href="/messages">
              <img
                src={message.src}
                className={Style.iconimg}
                onClick={(e: any) => {
                  setNavBar(!isNavBar);
                }}
              ></img>
            </Link>
            <div className={Style.userInterface}>
              <ul className={Style.usersInterfaceUl}>
                <Link href={`/messages`}>
                  <li
                    onClick={(e: any) => {
                      setNavBar(!isNavBar);
                    }}
                  >
                    Users
                  </li>
                </Link>
                <Link href={`/messages/g`}>
                  <li
                    onClick={(e: any) => {
                      setNavBar(!isNavBar);
                    }}
                  >
                    Groups
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className={Style.child}>
            <Link href="/notification">
              <img
                src={Notification.src}
                className={Style.iconimg}
                onClick={(e: any) => {
                  setNavBar(!isNavBar);
                }}
              ></img>
            </Link>
          </div>
          <div className={Style.child}>
            <Link href="/game">
              <img
                src={iconGame.src}
                className={Style.iconimg}
                onClick={(e: any) => {
                  setNavBar(!isNavBar);
                }}
              ></img>
            </Link>
          </div>
          <div className={Style.child}>
            <img
              src={setting.src}
              onClick={onclickHandler}
              className={
                Style.iconimg
              } /*onClick={(e:any) => {setNavBar(!isNavBar);}} */
            ></img>
          </div>
        </div>
        <div
          className={Style.Logout}
          onClick={(e: any) => {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            };
            const data = {
              refreshToken: `${localStorage.getItem("refreshToken")}`,
            };
            axios
              .delete("http://10.12.10.5:3000/auth/42/logout", {
                headers,
                data,
              })
              .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                console.log("Delete successful");
                props.setUpdate(!props.update);
              })
              .catch(function (error) {
                if (error.response) {
                  router.push({
                    pathname: `/errorPage/${error.response.status}`,
                  });
                }
              });
          }}
        >
          <img
            src={iconLogout.src}
            className={Style.iconimg}
            onClick={(e: any) => {
              setNavBar(!isNavBar);
            }}
          ></img>
        </div>
      </div>
      <button
        className={isNavBar ? Style.btnOn : Style.btnOff}
        onClick={() => {
          setNavBar(!isNavBar);
        }}
      >
        <AiOutlineBars className={Style.icon} />
      </button>
    </>
  );
}
export default SidePar;
