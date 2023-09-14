import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { userAuth } from "./AuthApi"
import { action } from "./ActionApi"
import { useSelector,useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import axios from "axios"

const Form = () => {
  const location = useLocation()
  const [error,setError] = useState('')
  const { register, control, handleSubmit, formState, reset } = useForm()
  const { errors } = formState

  const {loginError, loginSuccess} = useSelector(state => state.login)
  const {actionError} = useSelector(state => state.action)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  let form

  switch(location.pathname){
    case '/deposit':
      form = {title:'Deposit',placeholder:{first:'Amount'},api:action}
      break
    case '/withdraw':
      form = {title:'Withdraw',placeholder:{first:'Amount'},api:action}
      break
    default:
      form = {title:'Login',placeholder:{first:'NID',second:'Username'},api:userAuth}
  }
  axios.defaults.withCredentials = true
  useEffect(() => {
    const isAuthenticated = () => {
    if(location.pathname === '/login'){
      axios.get('http://localhost:8000/login').then((response)=>{
        if(response.data.isLoggedIn)
          navigate('/deposit')
        else
          navigate('/login')
      }
      )
    }
    else{
      axios.get('http://localhost:8000/login').then((response)=>{
        if(!response.data.isLoggedIn)
          navigate('/')
    })}}
    isAuthenticated()
    loginError?setError(loginError):actionError?setError(actionError):setError('')
  },[loginSuccess,location.pathname,navigate,loginError,actionError,setError])

  const onSubmit = (data) => {
    data.location = location.pathname
    dispatch(form.api(data))
    reset()
  }
  return ( 
    <div className="content">
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 id={form.title}>{form.title}</h1>
        <div className="credentials">
            {form.placeholder.second && 
            <input type="text"
            placeholder={form.placeholder.second} 
            id={form.placeholder.second.toLowerCase()} 
            autoComplete="false" 
            {...register(form.placeholder.second.toLowerCase(),{required:{value:true,message:`${form.placeholder.second} is required`}})}
            />}
            {form.placeholder.second && errors[form.placeholder.second.toLowerCase()] && <p>{errors[form.placeholder.second.toLowerCase()].message}</p>}
            <input type="text" 
            placeholder={form.placeholder.first} 
            id={form.placeholder.first.toLowerCase()}
            {...register(form.placeholder.first.toLowerCase(),{validate:{isNumber:number => number > 0  || `${form.placeholder.first} is not valid`}})}
             />
             {errors[form.placeholder.first.toLowerCase()] && <p>{errors[form.placeholder.first.toLowerCase()].message}</p>}
        </div>
        <input type="submit" value={location.pathname === '/login'?'Login':`${form.title} Amount`}/>
    </form>
    <DevTool control={control}></DevTool>
    </div>
  )
}

export default Form