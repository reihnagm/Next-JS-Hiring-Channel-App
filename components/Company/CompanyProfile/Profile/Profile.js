import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileCompany } from "../../../../redux/actions/company"
import dynamic from "next/dynamic"
import Spinner from "../../../Spinner/Spinner"
const ProfileItem = dynamic(() => import("./ProfileItem/ProfileItem"))

const Profile = () => {
  const dispatch = useDispatch()
  const { company, loading } = useSelector(state => state.company)
  useEffect(() => {
    const fetchData = () => {
      dispatch(getCurrentProfileCompany())
    }
    fetchData()
  }, [])
  return loading ? <Spinner /> : <ProfileItem company={company} />
}
export default Profile
