import { useState,useRef, useEffect, use } from 'react'
 
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
     <Progress />
     <Stopwatch />
    </>
  )
}
function Progress() {
  const [progress, setProgress] = useState(60);  
  const handleChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;  
    if (value > 100) value = 100;  
    setProgress(value);
  };
  return (
    <>
    <input value={progress} onChange={handleChange} />
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
    </>
  );
}

function Stopwatch(){
    const [start,setStart]  = useState(0);
    const [min,setMin] = useState(10);
    const [stop,setStop] = useState(true)
    const [timer,setTimer] = useState();
    const [pauses,setPauses] = useState([])
    const [isCountDown,setIsCountDown] = useState(true)
    const handleChange = (e)=>{
      
      setMin(e.target.value)
      pause()
      setStart(0)
    }
    const format = (start)=>{
          let sec = Math.floor(start/1000);
          let mi =Math.floor( sec/60);
          let hr = Math.floor(min/60);
          let ms = (start%1000)
          sec = sec%60
          return `${hr.toString().slice(0,3).padStart(2,0)}:${mi.toString().padStart(2,0)}:${sec.toString().padStart(2,0)}:${ms.toString().padStart(3,0)}`
    }
    const startWatch = (e)=>{
      console.log((start/(1000*60)))
     setStop(false);
     
       
    }
    const pause = (e)=>{
      setPauses((prev)=>[...prev,start])
       setStop(true);
      clearInterval(timer)
    }
    useEffect(()=>{
     
      if(!stop){
       
        const timer =  setInterval(() => {
          setStart(prev=>{
            if(isCountDown && Math.floor(min*60*1000 <= prev+100)){
              console.log(min*60*1000+" "+prev)
             clearInterval(timer)
             alert(`${min} minutes completed`)
              pause()
              return prev;
            }
            // return prev+100;
             return prev+10
          });
         
        }, 10);
        setTimer(timer)
       }
      return () => clearInterval(timer);//always should be a fucntion 
    
    },[stop])
    return(
      <>
      <div>
        <input type="number"  value={min} onChange={handleChange}/>
        <input value={isCountDown} checked={isCountDown} type="checkbox" onChange={()=>setIsCountDown(prev=>!prev)}/>
        <h1>{format(start)}</h1>
         
        <h1>hh:mm:ss:ms</h1>
        <h3>{min}</h3>
        <button onClick={startWatch}>start</button>
        <button onClick={pause}>pause</button>
        <button onClick={()=>setStart(0)}>Reset </button>
        {
          pauses && 
          pauses.map((item,index)=>{
            return <h3 key={index}>Pause Number:{index+1}--{format(item)}</h3>
          })
        }
      </div>
      </>
    )
}

export default App
