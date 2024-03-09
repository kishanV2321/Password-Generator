import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook-> use for reference and build connection
  //Copy Password
  const passwordRef = useRef(null)
  const coptToClipBoard = useCallback( () => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
  }, [password])

  //useCallback -> use call back for optimization
  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!#$%&()*+^_`<=>?@";

    for (let i = 1; i <= length; i++) {
      let charIndx = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndx)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  //useEffect -> use effect for render automatically if any value chnage
  useEffect( () => {
    passwordGenerator()
  }
  , [length, numberAllowed, charAllowed])

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 py-3 my-8 shadow-md rounded-lg text-orange-600 bg-gray-700">
        <h1 
        className='text-white text-center text-3xl my-3'
        >Password Generator</h1>
        <div 
        className="flex shadow-sm overflow-hidden rounded-lg mb-4"
        >
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={coptToClipBoard}
          className='outline-none bg-blue-700 text-white px-2 py-1 shrink-0 hover:bg-blue-500'
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={8}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="lengthInput">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Special Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
