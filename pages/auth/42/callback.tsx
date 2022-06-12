import { NextRouter, useRouter } from "next/router";
import ErrorType from "../../../components/AllError/ErrorType";
async function fetchData(url: string) {
  const router = useRouter();
  const data = await fetch(url);
}

const callback = () => {
  const router = useRouter();
  router.query.code
    ? fetchData(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42/callback?code=${router.query.code}`
      ).catch(function (error) {
        if (error.response) {
          router.push({pathname :`/errorPage/${error.response.status}`})
        }
      })
    : undefined;
  return <div></div>;
};

export default callback;
