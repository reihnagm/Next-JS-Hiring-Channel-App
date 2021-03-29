import React from "react"
import dynamic from "next/dynamic"
const UserProfileEdit = dynamic(() => import("@components/Company/CompanyProfile/UserProfileEdit/UserProfileEdit"))

const Index = () => {
  return <UserProfileEdit />
}

export default Index
