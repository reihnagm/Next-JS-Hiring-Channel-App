import React from "react"
import EngineerItem from "@components/Engineer/EngineerItem/EngineerItem"
import Empty from "@components/Layouts/PageEmpty"
const EngineerList = ({ engineers }) => (
        engineers.length === 0 
        ? <Empty /> 
        : <div style={{
            margin: "10px 0 50px 0"
        }}>
            <EngineerItem engineers={engineers} />
        </div>
    )
export default EngineerList
