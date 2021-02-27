import React from "react"
import dynamic from "next/dynamic"
const ProfileEdit = dynamic(() => import("../../../components/Company/CompanyProfile/ProfileEdit/ProfileEdit"))

const Edit = () => {
  return <ProfileEdit />
}

export default Edit