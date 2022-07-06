import { useEffect } from "react";
import styles from "../../styles/twofactor/twofactor.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import ErrorType from "../../components/AllError/ErrorType";
import shield from '../../public/images/shield.png'
const authentication = () => {
  // useEffect(() => {
  //     let data;
  // axios({
  //     url: `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/2fa/generate`,
  //     data:data,
  //     headers: {Authorization: `Bearer ${localStorage.getItem("accessToken") as string}`},
  //     method:'POST',
  //     responseType: 'blob'
  // })
  // .then((response) => {
  //     console.log(response);
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('img');
  //     link.src = url;
  //     link.setAttribute(`style`, `width:250px;heght250px;`); //or any other extension
  //     console.log(link);
  //     document.getElementById("QrcodeContainer")?.appendChild(link);
  //     link.click();
  // });
  // })
  // axios({
  //     url: `http://10.12.10.2/2fa/generate`,
  //     headers:{ 'Authorization': `Bearer ${localStorage.getItem("accessToken") as string}`},
  //     method: 'POST',
  //     responseType: 'blob', // important
  // }).then((response) => {
  //     console.log(response);
  //     // const url = window.URL.createObjectURL(new Blob([response.data]));
  //     // const link = document.createElement('a');
  //     // link.href = url;
  //     // link.setAttribute('download', 'file.pdf'); //or any other extension
  //     // document.body.appendChild(link);
  //     // link.click();
  // });
  // })
  const router = useRouter()
  const route = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (route.query.token && route.query.refreshToken) {
        localStorage.setItem("accessToken", route.query.token as string);
        localStorage.setItem(
          "refreshToken",
          route.query.refreshToken as string
        );
      }
      // route.query.token = '';
      // route.query.refreshToken = '';
    }
  }, [route.query.token]);
  let result: any = [];
  let counter = 6;
  const handleClick = (first: any, last: string) => {
    counter--;
    if (last === "none") result.push(first.target.value);
    else if (first?.target.value?.length) {
      result.push(first.target.value);
      const two: any = document.getElementById(last)?.focus();
    }
  };
  const hendleDelete = (first: any, last: string) => {
    if (first.code === "Backspace") {
      counter++;
      if (first?.target.value?.length === 0) {
        result.pop();
        const two: any = document.getElementById(last)?.focus();
      }
    }
  };
  return (
    <>
      <div className={styles.GlobaleContainer}>
        <div className={styles.container} id="container">
          <div className={styles.QRcode} id="QrcodeContainer">
            <img src={shield.src} alt="shield_IMG" className={styles.Shield}/>
          </div>
          <h1 className={styles.Header}>Authenticate Your account</h1>
          <p className={styles.paragraph}>
            Protecting your account is out top priority. Please confirm your
            account by entring the authorization code by scannig the Qr code
            below
          </p>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              id="first"
              className={styles.codeInput}
              maxLength={1}
              onChange={(e: any) => handleClick(e, "sec")}
            />
            <input
              type="text"
              id="sec"
              className={styles.codeInput}
              maxLength={1}
              onChange={(e: any) => handleClick(e, "third")}
              onKeyUp={(e: any) => {
                hendleDelete(e, "first");
              }}
            />
            <input
              type="text"
              id="third"
              className={styles.codeInput}
              maxLength={1}
              onChange={(e: any) => handleClick(e, "fourth")}
              onKeyUp={(e: any) => {
                hendleDelete(e, "sec");
              }}
            />
            <input
              type="text"
              id="fourth"
              className={styles.codeInput}
              maxLength={1}
              onChange={(e: any) => handleClick(e, "fifth")}
              onKeyUp={(e: any) => {
                hendleDelete(e, "third");
              }}
            />
            <input
              type="text"
              id="fifth"
              className={styles.codeInput}
              maxLength={1}
              onChange={(e: any) => handleClick(e, "sixth")}
              onKeyUp={(e: any) => {
                hendleDelete(e, "fourth");
              }}
            />
            <input
              type="text"
              id="sixth"
              className={styles.codeInput}
              onChange={(e: any) => handleClick(e, "none")}
              onKeyUp={(e: any) => {
                hendleDelete(e, "fifth");
              }}
            />
            <input
              type="submit"
              value={`submit`}
              className={styles.submitButton}
              onClick={(e: any) => {
                const data = { twoFactorAuthenticationCode: result.join("") };
                axios
                  .post(
                    `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/2fa/authenticate`,
                    data,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "refreshToken"
                        )}`,
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      localStorage.setItem("accessToken", res.data.accessToken);
                      localStorage.setItem(
                        "refreshToken",
                        res.data.refreshToken
                      );
                      route.push("/home")
                    }
                  })
                  .catch(function (error) {
                    if (error.response) {
                      router.push({pathname :`/errorPage/${error.response.status}`})
                    }
                  });
                result = [];
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default authentication;

// {data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data: {refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…TE3fQ.fu54u-MCAr8NmnmEWCoVnpmZxNtaSyka0dSv-TusZQY', accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…cxN30.i_a1NabN7isUo5rRpd32fs08YPovUZ8ctorzag-Opjw'}
// headers: {content-length: '459', content-type: 'application/json; charset=utf-8'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status: 200
// statusText: "OK"
// [[Prototype]]: Object
