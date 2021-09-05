import React, { useEffect } from "react"
import { getCompanies } from "@redux/actions/company"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { CHANGE_FILTER_SEARCH_COMPANY, CHANGE_FILTER_SHOW_COMPANY, CHANGE_FILTER_SORT_COMPANY, CHANGE_FILTER_FILTERBY_COMPANY } from "../../redux/actions/types"
import dynamic from "next/dynamic"
const Spinner = dynamic(() => import("@components/Spinner/Spinner"))
const Header = dynamic(() => import("@components/Layouts/Header"))
const HeaderFilter = dynamic(() => import("@components/Layouts/HeaderFilter"))
const CompanyList = dynamic(() => import("@components/Company/CompanyList/CompanyList"))

const Index = ({ handleSearch, handleSort, handleFilterBy, handleShow }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { companies, loading, searchC, showC, sortC, filterByC } = useSelector(state => state.company)

  useEffect(() => {
    async function fetchData() {
      dispatch(await getCompanies(searchC, showC, sortC, filterByC))
    }
    fetchData()
    router.push(`/companies?show=${showC}&sort=${sortC}&filterby=${filterByC}`)
  }, [searchC, showC, sortC, filterByC])

  handleSearch = search => {
    dispatch({
      type: CHANGE_FILTER_SEARCH_COMPANY,
      payload: search
    })
  }
  handleFilterBy = filterBy => {
    dispatch({
      type: CHANGE_FILTER_FILTERBY_COMPANY,
      payload: filterBy
    })
  }
  handleSort = sort => {
    dispatch({
      type: CHANGE_FILTER_SORT_COMPANY,
      payload: sort
    })
  }
  handleShow = show => {
    dispatch({
      type: CHANGE_FILTER_SHOW_COMPANY,
      payload: parseInt(show)
    })
  }
  return (
    <>
      <Header handleSearchCompany={handleSearch} />
      <HeaderFilter handleFilterBy={handleFilterBy} handleSort={handleSort} handleShow={handleShow} />
      {loading ? <Spinner /> : <CompanyList companies={companies} />}
    </>
  )
}

export default Index
