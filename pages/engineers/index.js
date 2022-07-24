import React, { useEffect, useState } from "react"
import { getEngineers } from "@redux/actions/engineer"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { CHANGE_FILTER_SEARCH, CHANGE_FILTER_SHOW, CHANGE_FILTER_SORT, CHANGE_FILTER_FILTERBY } from "@redux/actions/types"
import dynamic from "next/dynamic"
const Spinner = dynamic(() => import("@components/Spinner/Spinner"))
const Header = dynamic(() => import("@components/Layouts/Header"))
const HeaderFilter = dynamic(() => import("@components/Layouts/HeaderFilter"))
const EngineerList = dynamic(() => import("@components/Engineer/EngineerList/EngineerList"))

const Index = ({ handleSearch, handleFilterBy, handleSort, handleShow }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { engineers, loading, searchN, showN, filterByN, sortN } = useSelector(state => state.engineer)

  useEffect(() => {
    if(!router.isReady) return;
    dispatch(getEngineers(searchN, showN, sortN, filterByN))
    dispatch({
      type: CHANGE_FILTER_SHOW,
      payload: parseInt(router.query.show)
    })
    dispatch({
      type: CHANGE_FILTER_SORT,
      payload: router.query.sort
    })
    dispatch({
      type: CHANGE_FILTER_FILTERBY,
      payload: router.query.filterBy
    })
  }, [router, searchN, showN, sortN, filterByN])

  handleSearch = search => {
    dispatch({
      type: CHANGE_FILTER_SEARCH,
      payload: search
    })
  }
  handleFilterBy = filterByParam => {
    router.push({
      pathname: "/engineers",
      query: {
        show: showN,
        sort: sortN,
        filterBy: filterByParam
      },
    })
    dispatch({
      type: CHANGE_FILTER_FILTERBY,
      payload: filterByParam
    })
  }
  handleSort = sortParam => {
    router.push({
      pathname: "/engineers",
      query: {
        show: showN,
        sort: sortParam,
        filterBy: filterByN
      },
    })
    dispatch({
      type: CHANGE_FILTER_SORT,
      payload: sortParam
    })
  }
  handleShow = showParam => {
    router.push({
      pathname: "/engineers",
      query: {
        show: showParam,
        sort: sortN,
        filterBy: filterByN
      },
    })
    dispatch({
      type: CHANGE_FILTER_SHOW,
      payload: parseInt(showParam)
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
