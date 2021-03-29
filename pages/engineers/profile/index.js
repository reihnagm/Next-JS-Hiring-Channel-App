import React from "react"
import { withRouter } from "next/router"
import dynamic from "next/dynamic"
const Profile = dynamic(() => import("@components/Engineer/EngineerProfile/Profile/Profile"))
const ProfileShow = dynamic(() => import("@components/Engineer/EngineerProfile/ProfileShow/ProfileShow"))

const Index = withRouter(({ router }) => {
  return router.query.slug ? <ProfileShow slug={router.query.slug} /> : <Profile />
})

export default Index
