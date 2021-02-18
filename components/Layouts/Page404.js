import React from "react"
import { Link } from "react-router-dom"
const Page404 = () => {
  const mainbox = {
    "background-color": "#95c2de",
    margin: "20px auto",
    height: "600px",
    width: "600px",
    position: "relative"
  }
  return (
    <div
      style={{
        "background-color": "white",
        margin: "10% auto 0 auto "
      }}
    >
      <div style={{ "text-align": "center" }}>
        <h3 style={{ "font-size": "28px" }}> Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? </h3>
        <h4 style={{ "font-size": "29px" }}>
          Let's go <Link to="/">home</Link> and try from there.
        </h4>
      </div>
    </div>
  )
}
export default Page404
