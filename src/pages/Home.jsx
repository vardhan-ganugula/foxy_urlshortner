import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { navlinks } from "../../utils";

function Home() {

  return (
    <>
      <Header hideAlert={false} navlinks={navlinks}/>
      <Main/>
    </>
  )
}

export default Home
