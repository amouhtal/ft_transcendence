import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/ErrorPage/Error.module.css";
import icon400 from "../../public/ErrorPage/400 Error Bad Request-bro.svg";
import icon401 from "../../public/ErrorPage/401 Error Unauthorized-pana.svg";
import icon403 from "../../public/ErrorPage/403 Error Forbidden-bro.svg";
import icon404 from "../../public/ErrorPage/404 error lost in space-pana.svg";
import icon500 from "../../public/ErrorPage/500 Internal Server Error-bro.svg";
import icon503 from "../../public/ErrorPage/503 Error Service Unavailable-pana.svg";
import icon504 from "../../public/ErrorPage/504 Error Gateway Timeout-bro.svg";
import { useRouter } from "next/router";

function ErrorType() {
  const [CodeStatus, setCodeStatus] = useState<string>("");
  useEffect(() => {
    typeof window != "undefined" &&
      setCodeStatus(window.location.pathname.split("/")[2]);
  }, []);
  return (
    <>
      {CodeStatus == "400" ? (
        <img className={style.Contante} src={icon400.src}></img>
      ) : CodeStatus == "401" ? (
        <img className={style.Contante} src={icon401.src}></img>
      ) : CodeStatus == "403" ? (
        <img className={style.Contante} src={icon403.src}></img>
      ) : CodeStatus == "404" ? (
        <img className={style.Contante} src={icon404.src}></img>
      ) : CodeStatus == "500" ? (
        <img className={style.Contante} src={icon500.src}></img>
      ) : CodeStatus == "503" ? (
        <img className={style.Contante} src={icon503.src}></img>
      ) : (
        CodeStatus == "504" && (
          <img className={style.Contante} src={icon504.src}></img>
        )
      )}
    </>
  );
}

export default ErrorType;
