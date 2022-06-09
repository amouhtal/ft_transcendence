import type { NextPage } from "next";
import styles from "../../styles/login/login.module.css";
import { FcGoogle } from "react-icons/fc";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import Fire from "../fire/fiere";

const Login = () => {
  const router = useRouter();
  // const url: string = "http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42";
  // fetchData(url);
  return (
    <div className={styles.login}>
      <p className={styles.Ft_trance}>Ft_Transcendence</p>
      <button className={styles.intra}>
        <a
          href="http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42/callback"
          className={styles.link}
        >
          {/* <div className={styles.Fire}>
          </div> */}
          <div className={styles.text}>
            {/* <div className={styles.fir}><Fire /></div> */}
            <div>
              <p>
                Sign in With <span className={styles.P42}>42</span>Intra
              </p>
            </div>
          </div>
        </a>
      </button>
    </div>
  );
};

export default Login;
