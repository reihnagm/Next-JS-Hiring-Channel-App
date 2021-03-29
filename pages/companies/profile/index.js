import React from "react"
import { withRouter } from "next/router"
import dynamic from "next/dynamic"
const Profile = dynamic(() => import("@components/Company/CompanyProfile/Profile/Profile"))
const ProfileShow = dynamic(() => import("@components/Company/CompanyProfile/ProfileShow/ProfileShow"))

const Index = withRouter(({ router }) => {
  return router.query["job-title"] ? <ProfileShow /> : <Profile />
})

export default Index
