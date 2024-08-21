import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link , useNavigate} from "react-router-dom";
import { toast } from 'sonner'
import { Button } from "../ui/button.jsx";
import { USER_API_END_POINT } from "@/utils/constant.js"
import axios from "axios";
import notificationSoundFile from "../login/notification.mp3"



const Login = () => {
  const [enterData, setEnterData] = useState({
    email:"",
    password:"",
    role:""
  })

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputData((prevData) => ({ ...prevData, [name]: value }));
  // };


  // const {loading} = useSelector((store) => store.auth); // Access the loading state

  const notificationSound = new Audio(notificationSoundFile)

  const enterDataFetch = (e) =>{
    setEnterData({...enterData, [e.target.name]:e.target.value})
  }
 
  const onLogin = async (e) => {
    e.preventDefault();
    try{

      const res = await axios.post(`${USER_API_END_POINT}/login`,
        enterData,{
        headers:{
          "content-type": "application/json"
        },
        withcredentials:true
      }
      );
      if(res.data.success){
        navigate("/")
        toast.success(res.data.message)

      // Play the notification sound
      notificationSound.play();
        }
      
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      notificationSound.play();
       
    }
  };

  return (

     <>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center   mx-auto">
        <form
          onSubmit={onLogin}
          className="mt-16 items-center  w-96 border border-gray-200 rounded-md p-4 my-10"
        >
       
        <div className="mx-auto w-72 ">
        
          <Label>Email</Label>
          <Input className="my-2"
            type="email"
            name="email"
            value={enterData.email}
            onChange={enterDataFetch}
            placeholder="enter your email"
            // value="email"
          />
         
          <Label >Password</Label>
          <Input type="text"  name="password" value = {enterData.password} onChange={enterDataFetch} className="my-2" placeholder="password"></Input>

          <div className="flex items-center justify-between gap-1 mt-5">
             
                <Label>Role</Label>
                <div className="flex gap-2 my-4">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={enterData.role === "student"}
                    onChange={enterDataFetch}
                  />
                  Student
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={enterData.role === "recruiter"}
                    onChange={enterDataFetch}
                  />
                  Recruiter
                </div>
              </div>
   
            <button type="submit"  className="mt-3  bg-slate-100 h-[40px] w-[80px] border-2  rounded-lg font-semibold">Login</button> 
          
          
          <p className="text-sm mt-3 ">Create account? <Link to="/signup" className="text-blue-400">Sign Up</Link> </p>
        </div>
        
      </form>
      </div>
   
    </>
   
  )
}

export default Login