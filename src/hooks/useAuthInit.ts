import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser, logout } from "@/store/authSlice"
import { getMyProfile } from "@/services/auth.service"

export const useAuthInit = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getMyProfile()
            .then((user) => {
                dispatch(setUser(user))
            })
            .catch(() => {
                dispatch(logout())
            })
    }, [dispatch])
}
