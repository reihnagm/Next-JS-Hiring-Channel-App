import React, { useEffect }  from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentProfileEngineer } from "@redux/actions/engineer"
import Spinner from "@components/Spinner/Spinner"
import PortfolioAddItem from "@components/Engineer/EngineerPortfolio/PortfolioAdd/PortfolioAddItem/PortfolioAddItem"

const PortfolioAdd = () => {
  const dispatch = useDispatch()
  const { engineer, loading } = useSelector(state => state.engineer)
  useEffect(() => {
    dispatch(getCurrentProfileEngineer())
  }, [])
  return loading 
  ? <Spinner />
  : ( 
    <>
      <div className="backdrop-bottom"></div>
      <PortfolioAddItem engineer={engineer} /> 
    </>
  )
}

export default PortfolioAdd