import React from "react"
import dynamic from "next/dynamic"
const ProfileEdit = dynamic(() => import("../../../components/Engineer/EngineerProfile/ProfileEdit/ProfileEdit"), {
  ssr: false
})

const Edit = () => {
  return <ProfileEdit />
}

export default Edit