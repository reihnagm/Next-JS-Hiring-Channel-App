import React from "react"
import dynamic from "next/dynamic"

const AddPortfolioComponent = dynamic(() => import("@components/Engineer/EngineerPortfolio/PortfolioAdd/PortfolioAdd"))

const AddPortfolio = () => {
  return <AddPortfolioComponent />
}

export default AddPortfolio