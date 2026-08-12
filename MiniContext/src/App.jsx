import { useState } from 'react'
import UserContextProvider from './context/userContextProvider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1>Context API</h1>
    </UserContextProvider>
  )
}

export default App
