import { useState,useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
var length = 5;
const styles ={
  input:{
    width:'20px',
    height:'30px',
    margin:'5px'
  }
}
function App() {
   
  const [inputArr,setInputArr] = useState(new Array(length).fill(1));
  const inputRef = useRef([])
  useEffect(()=>{
    inputRef.current[0]?.focus();
  },[])
  const handleOnChange =(e,index)=>{

    if(isNaN(e.target.value))return;
    console.log(e.key)
    console.log(index)
    const newArr = [...inputArr];
    const newVal = e.target.value.trim('')
    newArr[index] = newVal.slice(-1)
    setInputArr(newArr)
    newVal && inputRef.current[index+1]?.focus()
       
      }
      const removeValue =(e,index)=>{
         if(!e.target.value && e.key === 'Backspace'){
          inputRef.current[index-1]?.focus()
         }
          // 
      }
      const submit = (e)=>{
        e.preventDefault();
        alert([...inputArr])
      }
  return (
    <>
     { inputArr &&
      inputArr.map((input,index)=> (
        <input className='input' value={input} key={index} style={styles.input} ref={input=>{inputRef.current[index]=input}} onKeyDown={(e)=>removeValue(e,index)} type='text' onChange={(e)=>handleOnChange(e,index)} />
      ))
     }
     <button onClick={(e)=>submit(e)}>Submit</button>
    </>
  )
}

export default App
