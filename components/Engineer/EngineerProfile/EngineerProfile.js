import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileEngineer } from "../../../redux/actions/engineer"
import dynamic from "next/dynamic"
import Spinner from "../../Spinner/Spinner"
const ProfileItem = dynamic(() => import("./ProfileItem/ProfileItem"), {
  ssr: false
})

const EngineerProfile = () => {
  const { engineer, loading } = useSelector(state => state.engineer)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = () => {
      dispatch(getCurrentProfileEngineer())
    }
    fetchData()
  }, [])
  return loading ? <Spinner /> : <ProfileItem engineer={engineer} />
}

export default EngineerProfile
