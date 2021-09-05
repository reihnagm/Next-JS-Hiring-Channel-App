import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileCompany } from "@redux/actions/company"
import dynamic from "next/dynamic"
import Spinner from "@components/Spinner/Spinner"
const ProfileItem = dynamic(() => import("./ProfileItem/ProfileItem"))

const Profile = () => {
  const dispatch = useDispatch()
  const { company, loading } = useSelector(state => state.company)
  useEffect(() => {
    dispatch(getCurrentProfileCompany())
  }, [])
  return loading ? <Spinner /> : <ProfileItem company={company} />
}
export default Profile
