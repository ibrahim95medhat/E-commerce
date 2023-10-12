import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext();

export default function Authentication({children}) {
    let [isUserLoggedIn,setIsUserLoggedIn]=useState(false);
    useEffect(()=>{
        if(localStorage.getItem("token")!==null){
            setIsUserLoggedIn(true);
        }
        else{
            setIsUserLoggedIn(false);
        }
    },[])
    
  return (
    <>
        <UserContext.Provider value={{isUserLoggedIn,setIsUserLoggedIn}}>
            {children}
        </UserContext.Provider>
    </>
  )
}
