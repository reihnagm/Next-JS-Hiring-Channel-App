import "date-fns"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileCompany, updateProfileCompany } from "../../../../redux/actions/company"
import Spinner from "../../../Spinner/Spinner"
import ProfileEditItem from "./ProfileEditItem/ProfileEditItem"

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const { company, loading } = useSelector(state => state.company)
  useEffect(() => {
    const fetchData = () => {
      dispatch(getCurrentProfileCompany())
    }
    fetchData()
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <ProfileEditItem company={company} update={updateProfileCompany} />
    </>
  )
}
export default ProfileEdit