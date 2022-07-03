import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import Style from "../styles/app.module.css";
import backgrd from "../public/images/cool.png";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import Login from "../components/login/Login";
import { useRouter } from "next/router";
import io from "socket.io-client";
import axios from "axios";


let socket: any;
function MyApp({ Component, pageProps }: AppProps) {
  const [isConnect, changeStatus] = useState(true);
  const [showSidBar, setShowSidBar] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [showContent, setShowContent] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.margin = "0";
    document.getElementsByTagName("body")[0].style.width = "100%";
    document.getElementsByTagName("body")[0].style.height = "100%";
  });
  useEffect(() => {
    let socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, //'Bearer h93t4293t49jt34j9rferek...'
          },
        },
      },
      transports: ["websocket"],
      auth: {
        Authorization: `${localStorage.getItem("accessToken") as string}`,
      },
    };
    socket = io(
      `${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}`,
      socketOptions
    );
    socket.emit("startChannels");
  });


  return (
    <>
        <Provider store={store}>
          <div className={Style.App}>
            <Component {...pageProps} socket={socket} user={userInfo} />
            {console.log(",LooooooL",typeof window != "undefined" ?  window.location.pathname.split("/")[1] : "")}
            {typeof window != "undefined" &&
            (window.location.href.split("/")[3] != "game" && window.location.pathname.split("/")[1] != "errorPage" && window.location.pathname.split("/")[1] != "login")? (
              <SideBar
                setShowSidBar={setShowSidBar}
                showSidBar={showSidBar}
                setUpdate={setUpdate}
                update={update}
              />
            ) : (
              ""
            )}
          </div>
        </Provider>
    </>
  );
}

export default MyApp;
