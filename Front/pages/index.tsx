import Router, { useRouter } from "next/router"
import { useEffect } from "react";

function Home (){
    const route = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (route.query.token !== "undefined" && route.query.refreshToken !== "undefined")
            {
                localStorage.setItem("accessToken",route.query.token as string);
                localStorage.setItem("refreshToken",route.query.refreshToken as string);
            }
        }
    },[route.query.token])
    return (
        <div>
            {/* {route.push('/profile')}; */}
        </div>
    )
}

export default Home