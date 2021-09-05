import React from "react"
import CompanyItem from "@components/Company/CompanyList/CompanyList"
import Empty from "@components/Layouts/PageEmpty"
const CompanyList = ({ companies }) => (companies.length === 0 ? <Empty /> : <CompanyItem companies={companies} />)
export default CompanyList
