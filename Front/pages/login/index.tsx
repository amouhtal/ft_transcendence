import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../../components/login/Login'

const login = () => {
    const router = useRouter();
		if (typeof window != "undefined" && localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== "undefined" && localStorage.getItem("accessToken") !== '')
        {
            // router.push("/home");
            return (
                <div>

                </div>
            )
        }
    return (
        <div>
            <Login />
        </div>
    )
}

export default login;