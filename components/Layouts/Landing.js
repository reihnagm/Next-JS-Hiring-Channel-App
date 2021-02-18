import React from "react"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
const Landing = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Find the suitable and good quality Employee or Companies" />
        <title>Hiring Channel</title>
      </Head>
      <Header />
      <div id="landing" className="columns is-items-center is-justify-center">
        <div className="column is-two-fifths">
          <div id="cover-landing"></div>
        </div>
        <div className="column is-two-fifths">
          <div className="flex flex-d-column justify-c-center h-full">
            <h1 className="title text-black margin-normal">Welcome to Hiring Channel</h1>
            <p className="sub-title text-black">Want to find a job or looking for employees ? </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Landing
