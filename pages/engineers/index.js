import React, { useEffect, useState } from "react"
import { getEngineers } from "../../redux/actions/engineer"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { CHANGE_FILTER_SEARCH, CHANGE_FILTER_SHOW, CHANGE_FILTER_SORT, CHANGE_FILTER_FILTERBY } from "../../redux/actions/types"
import dynamic from "next/dynamic"
import Spinner from "../../components/Spinner/Spinner"
import Header from "../../components/Layouts/Header"
import HeaderFilter from "../../components/Layouts/HeaderFilter"
const EngineerList = dynamic(() => import("../../components/Engineer/EngineerList/EngineerList"),
  { ssr: false }
) 

const Index = ({ handleSearch, handleSort, handleFilterBy, handleShow }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { engineers, loading, searchN, showN, sortN, filterByN } = useSelector(state => state.engineer)
 
  useEffect(() => {
    dispatch(getEngineers(searchN, showN, sortN, filterByN))
    router.push(`/engineers?show=${showN}&sort=${sortN}&filterby=${filterByN}`, undefined, { shallow: true })
  }, [searchN, showN, sortN, filterByN])

  handleSearch = search => {
    dispatch({
      type: CHANGE_FILTER_SEARCH,
      payload: search
    })
  }
  handleFilterBy = filterBy => {
    dispatch({
      type: CHANGE_FILTER_FILTERBY,
      payload: filterBy
    })
  }
  handleSort = sort => {
    dispatch({
      type: CHANGE_FILTER_SORT,
      payload: sort
    })
  }
  handleShow = show => {
    dispatch({
      type: CHANGE_FILTER_SHOW,
      payload: parseInt(show)
    })
  }

  return (
    <>
      <Header handleSearchEngineer={handleSearch} />
      <HeaderFilter handleFilterBy={handleFilterBy} handleSort={handleSort} handleShow={handleShow} />
      {loading ? <Spinner /> : <EngineerList engineers={engineers} />}
    </>
  )
}

export default Index
