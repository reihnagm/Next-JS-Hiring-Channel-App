import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { getProfileEngineerBySlug } from "../../../../redux/actions/engineer"
import dynamic from "next/dynamic"
import Spinner from "../../../Spinner/Spinner"
const ProfileShowItem = dynamic(() => import("./ProfileShowItem/ProfileShowItem"), {
  ssr: false
})

const ProfileShow = ({ slug }) => {
  const dispatch = useDispatch()
  const { engineer, loading } = useSelector(state => state.engineer)
  useEffect(() => {
    const fetchData = () => {
      dispatch(getProfileEngineerBySlug(slug))
    }
    fetchData()
  }, [slug])
  return loading ? <Spinner /> : <ProfileShowItem engineer={engineer} />
}
export default ProfileShow
