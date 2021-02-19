import React from "react"
import { withRouter } from "next/router"
import dynamic from "next/dynamic"
const Profile = dynamic(() => import("../../../components/Engineer/EngineerProfile/Profile/Profile"), {
  ssr: false
})
const ProfileShow = dynamic(() => import("../../../components/Engineer/EngineerProfile/ProfileShow/ProfileShow"), {
  ssr: false
})

const Index = withRouter(({ router }) => {
  return router.query.slug ? <ProfileShow slug={router.query.slug} /> : <Profile />
})

export default Index
