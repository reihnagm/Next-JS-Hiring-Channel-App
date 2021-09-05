import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileEngineer } from "@redux/actions/engineer"
import dynamic from "next/dynamic"
import Spinner from "@components/Spinner/Spinner"
const ProfileItem = dynamic(() => import("./ProfileItem/ProfileItem"))

const Profile = () => {
  const { engineer, loading } = useSelector(state => state.engineer)
  const dispatch = useDispatch()
  useEffect(() => {
  	let current = true
    dispatch(getCurrentProfileEngineer())
    return () => {
      current = false
    }
  }, [])
  return loading ? <Spinner /> : <ProfileItem engineer={engineer} />
}

export default Profile
