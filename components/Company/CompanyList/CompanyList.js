import React from "react"
import CompanyItem from "../CompanyItem/CompanyItem"
import Empty from "../../Layouts/PageEmpty"
const CompanyList = ({ companies }) => (companies.length === 0 ? <Empty /> : <CompanyItem companies={companies} />)
export default CompanyList
