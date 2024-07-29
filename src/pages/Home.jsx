import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
function Home() {
  const navlinks = [
    {
      'name': "Home",
      'link': "/"
    },
    {
      'name': "About",
      'link': "/about"
    },
    {
      'name': "Signup",
      'link': "/signup"
    }
  ]
  return (
    <>
      <Header hideAlert={false} navlinks={navlinks}/>
      <Main/>
    </>
  )
}

export default Home
