import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from './main'
import { check } from './http/userAPI'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='flex flex-col justify-between min-h-[100vh]'>
        <div className=''>
          <AppRouter />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
})

export default App
