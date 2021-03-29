import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileEngineer } from "../../../../redux/actions/engineer"
import dynamic from "next/dynamic"
import Spinner from "../../../Spinner/Spinner"
const ProfileItem = dynamic(() => import("./ProfileItem/ProfileItem"))

const Profile = () => {
  const { engineer, loading } = useSelector(state => state.engineer)
  const dispatch = useDispatch()
  useEffect(() => {
  	let current = true
    async function fetchData () {
      dispatch(await getCurrentProfileEngineer())
    }
    fetchData()
    return () => {
      current = false
    }
  }, [])
  return loading ? <Spinner /> : <ProfileItem engineer={engineer} />
}

export default Profile
