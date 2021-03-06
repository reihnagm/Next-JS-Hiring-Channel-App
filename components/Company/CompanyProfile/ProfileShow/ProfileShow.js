import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { getProfileCompanyBySlug } from "../../../../redux/actions/company"
import dynamic from "next/dynamic"
import Spinner from "../../../Spinner/Spinner"
const ProfileShowItem = dynamic(() => import("./ProfileShowItem/ProfileShowItem"))

const ProfileShow = () => {
  const dispatch = useDispatch() 
  const router = useRouter()
  const { company, loading } = useSelector(state => state.company)
  useEffect(() => {
    async function fetchData () {
      if (router.asPath !== router.route) {
        dispatch(await getProfileCompanyBySlug(router.query['job-title']))
      }
    }
    fetchData()
  }, [router])
  return loading ? <Spinner /> : <ProfileShowItem company={company} />
}
export default ProfileShow
