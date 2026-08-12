import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [allowNumber, setAllowNumber] = useState(false)
  const [allowChar, setAllowChar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (allowNumber) {
      str += "0123456789"
    }
    if (allowChar) {
      str += "!@#$%&*"
    }

    for (let i = 0; i <= length; i++) {
      //It will give me index number of every character
      let charIndex = Math.floor(Math.random() * str.length +1)

      pass += str.charAt(charIndex) 
    }

    setPassword(pass)

  },[length,allowNumber,allowChar,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    //console.log("Password:",password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,allowChar,allowNumber,passwordGenerator ])

  return (
    <>
      <div className='w-full max-w-md mx-auto mt-8 shadow-md rounded-lg py-4 my-8 text-orange-500 bg-gray-800'> 
        <h1 className='text-white text-center text-2xl mb-4'>Password Generator</h1>
        <div className='flex shadow-md rounded-2xl my-2 bg-amber-50 overflow-hidden'>
          <input 
          type="text"
          value={password}
          className='flex-1 outline-none w-full px-3 py-1 my-2'
          placeholder='password'
          readOnly
          ref={passwordRef} 
          />
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-3 shrink-0 "
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={5}
            max={20}
            value={length}
            className='cursor-pointer' 
            onChange={(e)=> {setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked = {allowNumber}
            id='numberInput'
            onChange={()=>{
              setAllowNumber((prev)=>!prev)
            }} 
            />
            <label htmlFor="numberInput">Numbers</label>
            <input 
            type="checkbox"
            defaultChecked = {allowChar}
            id='characterInput'
            onChange={()=>{
              setAllowChar((prev)=>!prev)
            }} 
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>     
    </>
  )
}

export default App
