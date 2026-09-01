import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
    </>
  )
}

export default App
