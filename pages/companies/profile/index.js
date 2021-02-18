import React from "react"
import { withRouter } from "next/router"
import dynamic from "next/dynamic"
const CompanyProfile = dynamic(() => import("../../../components/Company/CompanyProfile/CompanyProfile"))
const ProfileShow = dynamic(() => import("../../../components/Company/CompanyProfile/ProfileShow/ProfileShow"))

const Index = withRouter(({ router }) => {
  return router.query.slug ? <ProfileShow slug={router.query.slug} /> : <CompanyProfile />
})

export default Index
