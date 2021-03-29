import React from "react"
import dynamic from "next/dynamic"
const Landing = dynamic(() => import("@components/Layouts/Landing"))

const Index = () => {
  return <Landing />
}

export default Index
