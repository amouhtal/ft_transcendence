import { NextRouter, useRouter } from "next/router";
async function fetchData(url: string) {
  const router = useRouter();
  const data = await fetch(url);
}

const callback = () => {
  const router = useRouter();
  router.query.code
    ? fetchData(
        `http://${process.env.NEXT_PUBLIC_IP_ADRESSE}:${process.env.NEXT_PUBLIC_PORT}/auth/42/callback?code=${router.query.code}`
      )
    : undefined;
  return <div></div>;
};

export default callback;
