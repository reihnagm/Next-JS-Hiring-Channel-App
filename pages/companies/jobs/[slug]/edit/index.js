import React from "react"
import dynamic from "next/dynamic"

const EditJob = dynamic(() => import("../../../../../components/Company/CompanyProfile/EditJob/EditJob"), {
  ssr: false
})

const Index = () => {
  return <EditJob />
}

export default Index
