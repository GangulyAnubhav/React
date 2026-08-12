import { useState } from 'react'

function App() {
  const [color, setColor] = useState("Olive")

  return (
    <>
      <div
      className="w-full h-screen flex justify-center"
      style={{ backgroundColor: color }}
      >

        <div className=" fixed flex flex-wrap justify-center gap-4 bottom-10 bg-white p-2 rounded-md shadow-md">
          <button
            className="bg-red-500 text-white px-4 py-1 hover:bg-red-600 rounded-3xl"
            onClick={() => setColor("Red")}
          >
            Red
          </button>
          <button
            className="bg-green-500 text-white px-4 py-1 hover:bg-green-600 rounded-3xl"
            onClick={() => setColor("Green")}
          >
            Green
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-1 hover:bg-blue-600 rounded-3xl"
            onClick={() => setColor("Blue")}
          >
            Blue
          </button>
        </div>
      </div>

      
    </>
  )
}

export default App
