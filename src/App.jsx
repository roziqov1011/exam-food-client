import './App.css'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { Context } from './context/contex'
import { ALL_MENU, BRANCHES, COUNTRIES, MENUS, NEW_BRANCH, NEW_MENU, NEW_ORDER, NEW_REGION, RESTARANS } from './Query'
import milliy from './img/milliy.jpg'
import milliyres from './img/milliyres.jpg'
import food from './img/food.jpg'
import branch from './img/branch.jpg'
import resres from './img/resres.jpg'







function App() {

const [ categoryID, setCountryID ] = useState("")
const [ localData, setLocalData ] = useState()
const [ restaranID, setRestaranID ] = useState("")
const [ count, setCount ] = useState([1])
const [ branchID, setBranchID ] = useState("")
const { data } = useQuery(COUNTRIES)
const { data: allMenu } = useQuery(ALL_MENU)

const { data: regionData } = useQuery(RESTARANS, {
variables: { categoryID }
})

const { data: branchData } = useQuery(BRANCHES, {
variables: { restaranID }
})

const { data: menuData } = useQuery(MENUS, {
variables: { branchID }
})

const [ newRegion ] = useMutation(NEW_REGION, {
update: (cache, data) => {
console.log(data)
}
})
const [ newBranch ] = useMutation(NEW_BRANCH, {
update: (cache, data) => {
console.log(data)
}
})

const [ newMenu ] = useMutation(NEW_MENU, {
update: (cache, data) => {
console.log(data)
}
})
const [ newOrder ] = useMutation(NEW_ORDER, {
  update: (cache, data) => {
  console.log(data)
  }
  })

const handleSubmit = e => {
e.preventDefault()

const { select, name } = e.target.elements

newRegion({
variables: {
name: name.value,
categoryID: select.value
}
})
}

const handleSubmitBranch = e => {
e.preventDefault()

const { select, name } = e.target.elements

newBranch({
variables: {
name: name.value,
restaranID: select.value
}
})
}

const handleSubmitMenu = e => {
e.preventDefault()

const { select, name, price } = e.target.elements

newMenu({
variables: {
name: name.value,
price: price.value-0,
branchID: select.value
}
})

console.log({name: name.value,
price: price.value,
branchID: select.value});


}



const hendleCount =()=>{
  setCount(count+1)
  console.log(count);
}


const HandleoOrderFoods = (e)=>{
   const foodsArr = []
 let cilckId = e.target.id
  let foundFood = allMenu.allMenu.find((e)=> e.id == cilckId)
  let getFood = JSON.parse(window.localStorage.getItem('foodData'))
  
  if(!window.localStorage.getItem('foodData')){
    foodsArr.push(foundFood)
  }
  if(getFood){
    for(let j of getFood){
      foodsArr.push(j)
    }
  }

  if(getFood){
    let foundlocal = getFood.find((e)=> e.id == foundFood.id)
    if(!foundlocal){
      foodsArr.push(foundFood)
    }else{
      console.log('bor');
    }
  }
  window.localStorage.setItem('foodData', JSON.stringify(foodsArr))
  setLocalData(JSON.parse(window.localStorage.getItem('foodData')))
}
  const submitFood =(e)=>{
    let cilckId = e.target.id
    let foundFood = allMenu.allMenu.find((e)=> e.id == cilckId)
    
    newOrder({
      variables: {
      order_id: foundFood.id,
      name: foundFood.name,
      price: foundFood.price-0
      }
      })
  }
return (<>

<div className="collapse" id="navbarToggleExternalContent">
  
  </div>
  <nav className="navbar navbar-dark bg-primary">
    <div className="container-fluid">
      
      <button className="navbar-toggler border-3 border-light text-white" type="button"data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      <i className="bi bi-cart3"></i>
      </button>
      <div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Order foods</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
   {localData && localData.map((e,i)=>(
     <div key={i} className="card card-body">
       <img src={food} alt="" className='card-img' />
       <h4>{e.name}</h4>
       <h4>{e.price} so'm</h4>
       <button onClick={submitFood} className='btn btn-success' id={e.id}>sotib olish</button>
     </div>
   ))}
  </div>
</div>
      <h2>🧑 Client panel </h2>
    </div>
   
  </nav>



  
  <div className="title mt-3  text-primary">
    <i>Category</i>
    <i>Restaurant</i>
    <i>Branche</i>
    <i>Menu</i>
  </div>
  <div className='card-wrap '>


  <div className="card-list">
      {
      data && data.categorys.map((e, i) => (
      <div onClick={()=> setCountryID(e.id)} key={i} className="card" >

        <div className="card-body">
          <img src={milliy} alt="" className='card-img'/>
          <button href="#" className="btn btn-primary mt-3">{e.name}</button>
        </div>
      </div>
      ))
      }
      </div>

    <div className='card-list'>
    {
    regionData && regionData.Restarans.map((e, i) => (
    <div onClick={()=> setRestaranID(e.id)}  key={i} className="card">
     <div className="card-body">
     <img src={resres} alt="" className='card-img '/>
          <button href="#" className="btn btn-primary mt-3">{e.name}</button>
        </div>
    </div>
    ))
    }
    </div>

    <div className='card-list'>
    {
    branchData && branchData.Branches.map((e, i) => (
    <div key={i}  onClick={()=> setBranchID(e.id)}  className="card">
      <div className="card-body">
      <img src={branch} alt="" className='card-img '/>
          <button onClick={()=>setCount(1)} href="#" className="btn btn-primary mt-3">{e.name}</button>
        </div>
    </div>
    ))
    }
    </div>

    <div className='card-list'>
    {
    menuData && menuData.Menus.map((e, i) => (
    <div  key={i} className="card">
      <div className="card-body">
      <img src={food} alt="" className='card-img '/>
      <p>{e.name}</p>
          <button href="#" className="btn btn-success mb-3">{e.price * count} so'm</button>
          <div className='count-wrap'>
            <button onClick={HandleoOrderFoods} id={e.id} className='btn btn-primary'>save</button>
            {/* <button className='btn btn-primary' onClick={()=>count > 1? setCount(count-1):null}>-</button>
            <span className='p-3'>{count}</span>
            <button className='btn btn-primary' onClick={()=>setCount(count+1)}>+</button> */}
          </div>
        </div>
    </div>
    ))
    }
    </div>
  </div>

</>)
}

export default App