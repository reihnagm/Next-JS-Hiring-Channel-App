import React from "react"
import EngineerItem from "@components/Engineer/EngineerItem/EngineerItem"
import Empty from "@components/Layouts/PageEmpty"
const EngineerList = ({ engineers }) => (engineers.length === 0 ? <Empty /> : <EngineerItem engineers={engineers} />)
export default EngineerList
