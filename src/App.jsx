import './App.css'
import { useQuery,  useMutation } from '@apollo/client'
import {  useState } from 'react'
import { ALL_MENU, BRANCHES, COUNTRIES, MENUS, NEW_ORDER, RESTARANS } from './Query'
import milliy from './img/milliy.jpg'
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


const [ newOrder ] = useMutation(NEW_ORDER, {
  update: (cache, data) => {
    console.log(data,cache)
  }
  })







const HandleoOrderFoods = (e)=>{
   const foodsArr = []
 let cilckId = e.target.id
  let foundFood = allMenu.allMenu.find((e)=> e.id === cilckId)
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
    let foundlocal = getFood.find((e)=> e.id === foundFood.id)
    if(!foundlocal){
      foodsArr.push(foundFood)
    }else{
      console.log('bor');
    }
  }
  window.localStorage.setItem('foodData', JSON.stringify(foodsArr))
 setLocalData(JSON.parse(window.localStorage.getItem('foodData')))
}


let status = true
  const submitFood =(e)=>{
    let cilckId = e.target.id
    let foundFood = allMenu.allMenu.find((e)=> e.id === cilckId)

    if(status){
      e.target.textContent = 'bekor qilish'
      e.target.classList='btn btn-danger'
      status = false
    } else
    if(!status){
      e.target.textContent = 'sotib olish'
      e.target.classList='btn btn-success'
      status = true
    }
    if(status){
      newOrder({
        variables: {
        order_id: foundFood.id,
        name: foundFood.name,
        price: foundFood.price-0
        }
        })
    }
  }
return (<>

<div className="collapse" id="navbarToggleExternalContent">
  
  </div>
  <nav className="navbar navbar-dark bg-primary ">
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
       {/* <div class="form-check form-switch" onClick={submitFood} id={e.id}>
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
        <label className="form-check-label" for="flexSwitchCheckDefault">sotib olish</label>
      </div> */}
       <button onClick={submitFood} className='btn btn-success sotib-olish' id={e.id}>sotib olish</button>
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