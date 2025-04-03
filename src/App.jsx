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
const todo =[
  {
  title:"title 1",
  description:"this is descrtption of 1"
},
{
  title:"title 2",
  description:"this is descrtption of 2"
},
{
  title:"title 3",
  description:"this is descrtption of 3"
},
{
  title:"title 4",
  description:"this is descrtption of 4"
},
{
  title:"title 5",
  description:"this is descrtption of 5"
},
]
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
     {
      todo.map((item,index)=>{
        return <Accordian key={index} title={item.title} description={item.description} />
      })
     }
     <SlideShow />
     <Pagination />
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
    const [tracker,setTracker] = useState();
    const [min,setMin] = useState(10);
    const [stop,setStop] = useState(true)
    const [timer,setTimer] = useState();
    const [pauses,setPauses] = useState([])
    const [isCountDown,setIsCountDown] = useState(true)
    const handleChange = (e)=>{
      
      setMin(e.target.value)
      setStop(true);
      clearInterval(timer)
      setStart(0)
    }
    const format = (start)=>{
          let sec = Math.floor(start/1000);
          let mi =Math.floor( sec/60)%60;
          let hr = Math.floor(min/60)%24;
          let ms = (start%1000)
          sec = sec%60
          return `${hr.toString().slice(0,3).padStart(2,0)}:${mi.toString().padStart(2,0)}:${sec.toString().padStart(2,0)}:${ms.toString().padStart(3,0)}`
    }
    const startWatch = (e)=>{
      console.log((start/(1000*60)))
      setTracker(Date.now()-start)
     setStop(false);
         
    }
    const pause = (e)=>{
      setPauses((prev)=>[...prev,start])
       setStop(true);
      clearInterval(timer)
    }
    useEffect(()=>{
      console.log(Date.now())
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
            // return prev+10;
             return Date.now()-tracker
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
        <label htmlFor="input"> Do you also need coundown</label>
        <input value={isCountDown} checked={isCountDown} type="checkbox" onChange={()=>setIsCountDown(prev=>!prev)}/>
        <h1>{format(start)}</h1>
         
        <h1>hh:mm:ss:ms</h1>
        <h3>{ isCountDown && (min*1000*60)-(start)>0 && format((min*1000*60)-(start))}</h3>
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


function Accordian(props){
 const [expand,setExpand] = useState(false);
  console.log(props)
  return (
     <>
     <div className="title" onClick={()=>setExpand((prev)=>!prev)}>
          <span>{props.title}</span>
     </div>
     {expand && <div className="description">
            <span>This is of {props.description}</span>
      </div>}
     
     </>
  )
}

function SlideShow(){
  const [show,setShow] = useState(["this is first","second","third","fourth"])
  const [index,setIndex] = useState(0);
useEffect(()=>{
 const timer = setInterval(()=>{
  console.log(index)
  setIndex((prev)=>{
      if(prev ===show.length-1){
        return 0;
      }
      else{
        return prev+1;
      }
  })

 },1000)

 return ()=>clearInterval(timer);
},[])
  return (
    <div>{show[index]}</div>
  )
}


function Pagination(){
  let limit=5;
   const [data,setData] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
   const [pageData,setPageData] = useState(data.slice(0,limit))
   const [index,setIndex]= useState(0);
  //  const sliceData = (index)=>{
  //       setPageData(data.slice(index,limit+index))
  //  }
  useEffect(()=>{
    setPageData(data.slice(index,limit+index))
  },[index,data])
const next = ()=>{
  if (index + limit >= data.length) {
    alert("No more elements");
    return;
  }

  setIndex(prev=>prev+limit);
  //sliceData(index+limit)
}

const prev = ()=>{
  if(index<=0){
    alert("you are already on first pages");
    return;
  }
  setIndex(prev=>prev-limit);
  //sliceData(index-limit)
}
  //  const next = (e)=>{
  //   if(e.target.value ==="prev" && index>0){
  //     setIndex(prev=>Math.max(0,prev-limit))
  //   }
  //   else{
  //     setIndex(prev=>prev+limit)
  //   }
  
  //   console.log(index)
  //   if(index>=data.length){
  //     alert("no more elements")
  //     return;
  //   }
  //   setPageData((prev)=>{
     
  //     if(index+limit>=data.length){
  //       console.log("in if")
  //       return data.slice(index,data.length-1);
  //     }
  //     else{
  //       console.log("in else")
  //        return  data.slice(index,index+limit);
  //     }
    
  //   })
    
  //  }
   
  return (
    <>
    {
      pageData && pageData.map((item,index)=>{
        return <h4 key={index}>No. {item}</h4>
      })
    }
    <button value="prev" onClick={prev}>prev</button>
    <button onClick={next}>next</button>
    </>
  )
}

export default App


