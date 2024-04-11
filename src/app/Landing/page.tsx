"use client"

import Link from "next/link";
import { I, Title } from '@/components'
import { useState , useEffect } from "react";
import { BACKEND_LINK } from "@/data/const"

export default function Register() {
  const urlback = BACKEND_LINK;
  
  const [auth,setauth] = useState(true)
  const [secondregister,setregisterphase] = useState(false)

  const [loginFullName, setLoginFullName] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [LoginError, setLoginError] = useState('');

  function toggleauth(){
    setauth(!auth)
  }
  const handleLogin = (e) => {
    e.preventDefault();

    const requestBody = {
        fullName: loginFullName,
        username: loginUsername,
        email: loginEmail,
        password: loginPassword
    };

    fetch(urlback + 'api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Credentials Are Wrong');
        }
    })
    .then(data => {
        console.log('Login successful:', data);
        setCookie("token", data.message, 3);
        setCookie("userinfos",JSON.stringify({Name:loginUsername,Email:loginEmail}) , 3);
        
        window.location.href = '/';
    })
    .catch(error => {
        setLoginError('Credentials Are Wrong');
    });
}

function setCookie(name:string, value:any, daysToExpire:number) {
  console.log(value + 'tuvio')
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

  const [registerFullName, setRegisterFullName] = useState('');
  const [registerRegion, setRegisterRegion] = useState('');
  const [registerMrMrs, setRegisterMrMrs] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerChoosenDate, setRegisterChoosenDate] = useState('');
  const [validRegisterOperation, setValidRegisterOperation] = useState(false);
  const [msgErrorPassword, setMsgErrorPassword] = useState(null);
  const [msgErrorMrMrs, setMsgErrorMrMrs] = useState(null);
  const [msgErrorConfirmpassword, setMsgConfirmpasswor] = useState(null);

  const [togglepassword, settogglepassword] = useState(true);
  
  function togglefunction(){
    settogglepassword(!togglepassword)
  }
  var isMrMrsValid:any;
  var isPasswordValid:any;
  useEffect(() => {
    isPasswordValid = registerPassword.length >= 8 && registerConfirmPassword.length >= 8;
    setMsgErrorPassword(registerPassword.length < 8 ? "Min 8 characters" : null);
    isMrMrsValid = /^(Mr|Mrs)$/.test(registerMrMrs);
    setMsgErrorMrMrs(!isMrMrsValid ? "Please enter 'Mr' or 'Mrs'" : null);
    setMsgConfirmpasswor(registerPassword !== registerConfirmPassword ? "Password Must match" : null);
    setValidRegisterOperation(isPasswordValid && isMrMrsValid);
    console.log(msgErrorPassword,msgErrorMrMrs)
  }, [registerPassword, registerConfirmPassword, registerMrMrs]);

  const handleRegister = () => {
    const isPasswordValid = registerPassword.length >= 8 && registerConfirmPassword.length >= 8;
    const isMrMrsValid = /^(Mr|Mrs)$/.test(registerMrMrs);
    const isValid = isPasswordValid && isMrMrsValid;

    const requestBody = {
          fullName: registerFullName,
          region: registerRegion,
          mrOrMrs: registerMrMrs,
          email: registerEmail,
          password: registerPassword,
          confirmPassword: registerConfirmPassword,
          choosenDate: registerChoosenDate
      };
    if (isValid) {
        // Perform registration logic here
        fetch(urlback+'api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        
    } else {
        if (registerPassword.length < 8 || registerConfirmPassword.length < 8) {
            console.log('Password must be at least 8 characters long');
        }
        if (!isMrMrsValid) {
            console.log('Please enter "Mr" or "Mrs" for Mr or Mrs field');
        }
    }
};

  function switchphase(){
    console.log(registerFullName,registerRegion,isMrMrsValid)
    if((registerFullName !== '') &&  (registerRegion !== '') && ((registerMrMrs === 'Mr') ||( registerMrMrs === 'Mrs'))){

      setregisterphase(!secondregister);
    }else{
      console.log("not sutecfied")
    }
  }
  return (
    <main className="main flex justify-center  containerpatern  ">
      
        <div className="w-4/5 authfront h-4/5 border rounded-lg md:flex">
    <div
      className="relative overflow-hidden md:flex w-1/2 authphoto i justify-around items-center hidden">
      <div>
        <h1 className="text-app-light font-bold text-4xl font-sans">SpaceTech</h1>
        <p className="text-app-light mt-1">The most popular peer to peer lending at SEA</p>
        <button type="submit"  className="block w-28 bg-app-light text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
      </div>
      <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
    {
        !auth ?
        <div className="flex  flex-col md:w-1/2 gap-4 justify-center py-10 items-center bg-app-light">
          <div className=" overflow-hidden flex relative w-4/5 h-3 border rounded-2xl">
           
            <div className="  bg-app-primary w-1/2  right-0 h-full"></div>
            <div className={`${secondregister ? 'bg-app-primary' :  ''}   w-1/2 self-end left-0 h-full`}></div>

          </div>
      <form  className="bg-app-light">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Welkome to SpaceTech!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">Ohaui</p>
        {
          !secondregister ? 
          <>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd" />
          </svg>
          <input required 
          value={registerFullName}
          onChange={(e) => setRegisterFullName(e.target.value)}
          className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" />
        </div>
        <div className="relative flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
              fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd" />
            </svg>
            <input
            value={registerRegion}
            onChange={(e) => setRegisterRegion(e.target.value)}
            className="pl-2   outline-none border-none" type="text" name="" id="" placeholder="Region" />
            
         
            </div>

          <div className="relative  flex items-center border-2 py-2 px-3 rounded-2xl mb-6">
          <img width="23" height="23" src="https://img.icons8.com/9299A5/23/gender-equality.png" alt="gender-equality"/>
            <input
            value={registerMrMrs}
            onChange={(e) => setRegisterMrMrs(e.target.value)}
            className="pl-2  outline-none border-none" type="text" name="" id="" placeholder="Mr or Mrs" pattern="^(Mr|Mrs)$" title="Please enter 'Mr' or 'Mrs'" />
          {
              msgErrorMrMrs &&

              <Title coler={'orange-700'} text={msgErrorMrMrs} side="bottom" />
            }
          </div>
          <div className="  hover:cursor-pointer gap-5 flex items-center h-12 bg-app-light  border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-app-dark  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img width="20" height="20" src="https://img.icons8.com/color/20/google-logo.png" alt="google-logo"/>
                    <span className=" text-sm  font-serif ">Continue with Google</span>
            
          </div>
        
        </>
          :
          <>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input required 
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
           
              className="pl-2 outline-none border-none" type="email" name="" id="" placeholder="Email Address" />
        </div>
        <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
                <input
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="pl-2 outline-none border-none" type={togglepassword ? `text` : 'password'} name="" id="" placeholder="Password" />
                {
                  !togglepassword ?
                    <img className="hover:cursor-pointer hover:scale-110" width="24" onClick={togglefunction} height="24" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/24/external-view-content-creator-tanah-basah-glyph-tanah-basah-2.png" alt="external-view-content-creator-tanah-basah-glyph-tanah-basah-2"/>
                  :
                  <img width="24" className="hover:cursor-pointer hover:scale-110" onClick={togglefunction} height="24" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/9299A5/external-view-content-creator-tanah-basah-basic-outline-tanah-basah.png" alt="external-view-content-creator-tanah-basah-basic-outline-tanah-basah"/>

                }
                {
              msgErrorPassword &&

              <Title coler={'orange-700'} text={msgErrorPassword} side="bottom" />
            }
        </div>
        <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <input required 
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="ConfirmPassword" />
            {
              msgErrorConfirmpassword &&

              <Title coler={'orange-700'} text={msgErrorConfirmpassword} side="bottom" />
            }
        </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input required 
            value={registerChoosenDate}
            onChange={(e) => setRegisterChoosenDate(e.target.value)}
            className="pl-2 outline-none border-none  w-full " type="date" name="" id="" placeholder="Choosen Date" />
          </div>
        
        </>
        }
        
                {
                  secondregister ?
                  <div  onClick={handleRegister} className="w-4/5 m-auto justify-center flex  btn-base mt-4 py-2 rounded-2xl text-app-light font-semibold mb-2">Register</div>

                  :
                  <div onClick={switchphase}  className=" w-4/5 m-auto justify-center flex  btn-base mt-4 py-2 rounded-2xl text-app-light font-semibold mb-2 ">Next</div>

                }
                  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ? </span><span  onClick={toggleauth} className="text-sm ml-2 text-blue-500 underline hover:text-red-500 cursor-pointer">Register</span>
      </form>
    </div>
        :
    <div className="flex md:w-1/2 justify-center py-10 items-center bg-app-light">
      <form className="bg-app-light" onSubmit={handleLogin}>
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
      <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
      
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
        <input required className="pl-2 outline-none border-none" type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
        <input required className="pl-2 outline-none border-none" type="text" placeholder="Email Address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      </div>
     
      <div className="flex relative items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
                <input
                 value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} 
                className="pl-2 outline-none border-none" type={togglepassword ? `text` : 'password'} name="" id="" placeholder="Password" />
                {
                  !togglepassword ?
                    <img className="hover:cursor-pointer hover:scale-110" width="24" onClick={togglefunction} height="24" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/24/external-view-content-creator-tanah-basah-glyph-tanah-basah-2.png" alt="external-view-content-creator-tanah-basah-glyph-tanah-basah-2"/>
                  :
                  <img width="24" className="hover:cursor-pointer hover:scale-110" onClick={togglefunction} height="24" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/9299A5/external-view-content-creator-tanah-basah-basic-outline-tanah-basah.png" alt="external-view-content-creator-tanah-basah-basic-outline-tanah-basah"/>

                }
                {
              msgErrorPassword &&

              <Title coler={'orange-700'} text={msgErrorPassword} side="bottom" />
            }
        </div>
      <div className="  hover:cursor-pointer gap-5 flex items-center h-12 bg-app-light  border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-app-dark  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img width="20" height="20" src="https://img.icons8.com/color/20/google-logo.png" alt="google-logo"/>
                    <span className=" text-sm  font-serif ">Continue with Google</span>
            
          </div>
      <button type="submit" className="block w-full btn-base mt-4 py-2 rounded-2xl text-app-light font-semibold mb-2">Login</button>
      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ? </span><span  onClick={toggleauth} className="text-sm ml-2 hover:text-red-500 text-blue-500 underline cursor-pointer">Login</span>
    </form>
    </div>
    }
        </div>

      
        {/* <Link className="btn-base" href="">
          <span>Get Started</span>
        </Link> */}
      
    </main>
  )

}