import { useState,useCallback ,useEffect,useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //ref hook
  const passwordRef =useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str +="0123456789"
    if (charAllowed) str +="!@#$%^&*_-+=[]{}~`"

    for(let i= 1;i<=length;i++){
        let char = Math.floor(Math.random() * str.length+1)
        pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])

const copyPasswordToCliboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,length)
  window.navigator.clipboard.writeText(password)
},[password])
  return (
    <>
      <div className='container'>
        <h1 >Password Generator</h1>
        <div className='content'>
          <input type="text" value={password} readOnly placeholder='Password' ref={passwordRef}/>
          <button className='btnCopy' onClick={copyPasswordToCliboard}>Copy</button>
        </div>
        <div className="footer">
          <div className="footer-1">
            <input className='range' type="range" min={6} max={100} value={length} onChange={(e)=>setlength(e.target.value)} />
            <label >Length:{length}</label>
          </div>
          <div className='footer-2'>
            <input id='c1' className='check' type="checkbox"  defaultChecked={numberAllowed} onChange={()=>{setnumberAllowed((prev)=>!prev)}}/>
            <label htmlFor="c1">Numbers</label>
          </div>
          <div className="footer-3">
            <input type="checkbox" id="char" defaultChecked={charAllowed} onChange={()=>{
              setcharAllowed((prev)=>!prev)
            }} />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
