import { useEffect } from 'react';
import { useState,useCallback ,useRef} from 'react'

function App() {
  const [len, setLength] = useState(8)
const [numberallowed,setNumberallowed]=useState(false);
const [charallowed,setcharallowed]=useState(false);
const [password,setPassword]=useState("");

//  useCallback Hook.................
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberallowed){
   str += "0123456789"
    }
    if(charallowed){
   str += "~!@#$%^&*(){}+-_[]',"
    }
   for(let i=1;i<=len;i++){
  let char=Math.floor(Math.random()*str.length+1);
pass  += str.charAt(char);
    }   setPassword(pass);
  },[len,numberallowed,charallowed,setPassword]);

// useRef Hook 
const passwordRef=useRef(null);
const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,9);
     window.navigator.clipboard.writeText(password)
},[password])


  //    UseEffect Hook.......................
  useEffect(
    ()=>{
      passwordGenerator()
    },[len,numberallowed,charallowed,passwordGenerator]
       );
  return (
    <div  className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 py-3 my-8 bg-gray-800 text-orange-500'>
   <h1  className='text-white text-center'>Password Generator</h1>
    <div className='flex my-3 shadow rounded-lg overflow-hidden mb-4'>
      <input type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
       ref={passwordRef}
       ></input>
      <button    onClick={copyPasswordToClipBoard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max="100"
        value={len}
         className='cursor-pointer'
         onChange={e=>{setLength(e.target.value)}}
         ></input>
         <label>Length :{len} </label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
       defaultChecked={numberallowed}
       id="numberInput"
       onChange={()=>{
             setNumberallowed((prev)=>!prev);
       }}
         ></input>
         <label  htmlFor="numberInput">Numbers </label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
       defaultChecked={charallowed}
       id="charInput"
       onChange={()=>{
             setcharallowed((prev)=>!prev);
       }}
         ></input>
         <label  htmlFor="charInput">Characters </label>
      </div>
    </div>
    
    </div>
  )
}

export default App
