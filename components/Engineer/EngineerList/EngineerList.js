import React from "react"
import EngineerItem from "../../Engineer/EngineerItem/EngineerItem"
import Empty from "../../Layouts/PageEmpty"
const EngineerList = ({ engineers }) => (engineers.length === 0 ? <Empty /> : <EngineerItem engineers={engineers} />)
export default EngineerList
