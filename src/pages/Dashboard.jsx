import React, { useEffect } from 'react'
import CheckLogin from '../../utils/AuthProvider'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
  const navigate = useNavigate();
  useEffect(()=> {

    if(!CheckLogin()) 
      navigate('/login')

  }, [])
  
  return (
    <div>
      this is dashboard
    </div>
  )
}

export default Dashboard
