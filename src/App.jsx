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
     {/* <Pagination /> */}
     <Forms />
     <EmiCalculator />
     <NestedCheakList />
     <StarRating />
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
    <button disabled={index<=0} value="prev" onClick={prev}>prev</button>
    <button disabled={index+limit>=data.length} onClick={next}>next</button>
    </>
  )
}


function EmiCalculator(){
  const [price,setPrice] = useState(0);
  const [intrest,setIntrest] = useState(0);
  const [months,setMonths] = useState(0);
  const [result,setResult] = useState(0)
  useEffect(()=>{
    let cal = (intrest/100)*price;
    cal = cal/12;
       setResult(cal)
  },[months,price,intrest])
  return (

    <>
     <h2>Emi Calculator</h2>
     <label htmlFor="price">Price </label>
     <input id='price' type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
     <label htmlFor="intrest">Intrest</label>
     <input id='intrest' type="number" value={intrest} onChange={(e)=>setIntrest(e.target.value)}/>
     <label htmlFor="months">Months</label>
     <input type="number" value={months} onChange={(e)=>setMonths(e.target.value)}/>

     <button  >Calculate</button>
     <h3>Your monthly payment will be Rs.{result}</h3>
    </>
  )
}

function Forms(){
 
  const [index,setIndex]= useState(0);
   const [formData,setFormData] = useState([
    {
      name:"",
      surname:"",
      age:0
    },
    {
      subject:"",
      year:0,
      div:""
    },
    {
       city:"",
       state:"",
       country:""
    }
   ])
   const handleEnter = (e)=>{
      console.log(e.key)
    //in this approch difficult to handle the enter condition as index is for the parent object and not the entity so for that you have to think about that or change that approch i guess   
   }
   const handleForm = (e, subItem) => {
    // let updatedForm = [...formData];
    // updatedForm[index][subItem] = e.target.value;
    // setFormData(updatedForm)
    setFormData((prev)=>{
      let updatedForm = [...prev];
      updatedForm[index] = { ...updatedForm[index], [subItem]: e.target.value };//for object also you need new as the refrance problem if you try to update the earlier one "React may not detect the change properly."
      return updatedForm;
    })
  };
   const prev = ()=>{
    setIndex(prev=>prev-1);
    //sliceData(index-limit)
  }
  const next = ()=>{
    setIndex(prev=>prev+1);
  }
  return (
    <>
     <form>
     {formData.slice(index,index+1).map((item)=>{
      return Object.keys(item).map((subItem)=>{
        return <input className='formInputs' placeholder={subItem} type='text' onKeyDown={handleEnter} value={item[subItem]} key={subItem+"R"}  onChange={(e) => handleForm(e, subItem)}/>
       })
     })}
      
     </form>
     <button disabled={index<=0} value="prev" onClick={prev}>prev</button>
      <button disabled={index+1>=formData.length} onClick={next}>next</button>
     <h1>{formData.map((item)=>{
      return Object.keys(item).map((subItem)=>{
        return <p key={subItem+"R"}>{subItem}:{item[subItem]}</p>
      })
     })}</h1>
    </>
  )
}

function NestedCheakList( ){
const [data,setData] = useState([
  {
    id: 1,
    label: "Fruits",
    checked: false,
    children: [
      { id: 2, label: "Apple", checked: false },
      { id: 3, label: "Banana", checked: false },
      {
        id: 4,
        label: "Citrus",
        checked: false,
        children: [
          { id: 5, label: "Orange", checked: false },
          { id: 6, label: "Lemon", checked: false }
        ]
      }
    ]
  },
  {
    id: 7,
    label: "Vegetables",
    checked: false,
    children: [
      { id: 8, label: "Carrot", checked: false },
      {
        id: 9,
        label: "Leafy Greens",
        checked: false,
        children: [
          { id: 10, label: "Spinach", checked: false },
          { id: 11, label: "Lettuce", checked: false }
        ]
      }
    ]
  },
  {
    id: 12,
    label: "Dairy",
    checked: true,
    children: [
      { id: 13, label: "Milk", checked: false },
      { id: 14, label: "Cheese", checked: false }
    ]
  }
])
const handleChange = (id,checked)=>{
  // console.log(e.target.checked)
  // setData((prev)=>{
  //   const newPrev = [...prev];
  //   newPrev[index].checked = e.target.checked;
  //   return newPrev;
  // })
  const updateTree = (item) =>
    item.map((item) => {
      if (item.id === id) {
        // if(item.children && checked===true){
        //   item.children.map((subItem)=>subItem.checked=true )
        // }
        console.log("this is in item"+id+item.label)
        return {
          ...item,
          checked:checked,
          children: item.children ? updateTree(item.children) : []
        };
      }
      if (item.children ) {
                  
        console.log("this is in children"+id+item.label)
        // if(item.children && checked===true){
        //   item.children.map((subItem)=>subItem.checked=true )
        // }
        return {
          ...item,
           
          children: updateTree(item.children)
        };
      }
      return item;
    });

  setData((prev) => updateTree(prev));
}
useEffect(()=>{
  console.log(data)
},[data])
  return (
    <>
     {
        data && data.map((item,index)=>{
          return <CheakList key={item.id} item={item} handleChange={handleChange} index={index}/>
        })
     }
    </>
  )


}

function CheakList(props){
   const [expand,setExpnad] = useState(false);

   return (
    <>
      <div className="parent" >
            <label htmlFor="parent" onClick={()=>setExpnad((prev)=>!prev)}>{props.item.label}</label>
             <input   key={props.item.id} type="checkbox"   checked={props.item.checked} onChange={(e)=>props.handleChange(props.item.id,e.target.checked,props.item)} /></div>
             {/* <div  className="child"  style={{margin:'20px',display:'flex',flexDirection:'column'}}> {expand && props.item.children.map((subItem,subIndex)=>{
                return    <input     key={subItem.id} type="checkbox"   checked={subItem.checked} onChange={(e)=>props.handleChange(subItem.id,e.target.checked)} />
               })} </div> */}
                  <div className="parent" >
                     {props.item.children && expand &&
            props.item.children.map((child) => (
              <CheakList
                key={child.id}
                item={child}
                handleChange={props.handleChange}
              />
            ))}
            </div>
    </>
   )
}
var starCount =5;
function StarRating(){
//   In React state updates: don’t mutate existing objects/arrays, always return new copies (especially nested ones).
// That’s why .map() + spread operator is the go-to approach here.
// setAllRatings((prev)=>{
//   const newRating = [...prev]; // ✅ new array (good)
//   newRating.map((item)=>item.id<=id?item.isCheaked=true:true); // ❌ mutates existing objects
//   return newRating;
// });
// Even though newRating is a new array:
// Each item inside it is still the same object as before (item is not cloned).
// And you're mutating those objects (item.isCheaked = true).
// So React doesn’t know anything changed (especially if the object reference is the same).

  const [allRatings,setAllRatings] = useState([{id:1,isCheaked:false},{id:2,isCheaked:false},{id:3,isCheaked:false},{id:4,isCheaked:false},{id:5,isCheaked:false}]);
  const [isHover,setIsHover] = useState(0);
  const handleClick =(e,id)=>{
    console.log(id)
    setAllRatings((prev) =>
      prev.map((item) => ({
        ...item,  
        isCheaked: item.id <= id 
      }))
    );
  }
  const onHover = (id)=>{
     setIsHover(id)
  }
  const clear = ()=>{
    setAllRatings((prev)=>
    prev.map((item)=>({...item,isCheaked:false}))
    )
  }
  const [rating,setRating] = useState(0);
  return (
    <>
     
     {allRatings.map((item,index)=>{
      return <span key={item.id} className={`fa fa-star ${item.isCheaked || item.id<=isHover?"cheaked":""}`} onMouseOver={()=>onHover(item.id)} onMouseOut={()=>setIsHover(0)} onClick={(e)=>handleClick(e,item.id)}> </span>
     })}
     <button onClick={clear}>clear</button>
    </>
  )
}
// If the array reference is new, React will notice a potential change.

// But for internal updates, the objects themselves must also be new references (if they’ve changed).

// Just changing the array without touching object references won’t trigger a proper re-render.
export default App


