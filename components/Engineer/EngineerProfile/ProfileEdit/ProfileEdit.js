import React, { useEffect } from "react"
import "date-fns"
import dynamic from "next/dynamic"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentProfileEngineer, updateProfileEngineer } from "../../../../redux/actions/engineer"
import { getSkills } from "../../../../redux/actions/skill"
import Spinner from "../../../Spinner/Spinner"
const ProfileEditItem = dynamic(() => import("./ProfileEditItem/ProfileEditItem"), {
  ssr: false
})

const ProfileEdit = ( ) => {
  const dispatch = useDispatch()
  const { engineer, loading } = useSelector(state => state.engineer)
  const { skills } = useSelector(state => state.skill)
  useEffect(() => {
    const fetchData = () => {
      dispatch(getCurrentProfileEngineer())
      dispatch(getSkills())
    }
    fetchData()
    console.log(skills)
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="backdrop-bottom"></div>
      <ProfileEditItem engineer={engineer} allSkills={skills} updateProfileEngineer={updateProfileEngineer} />
    </>
  )
}
export default ProfileEdit