import React, { useState } from 'react';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth' 
import app from './firebase.init';


const auth= getAuth(app)
const App = () => {

const [user,setUser]= useState([]);

const googleProvider= new GoogleAuthProvider();
const githubProvider= new GithubAuthProvider()



const handelGoogleSigIn=()=>{
  signInWithPopup(auth,googleProvider)
  .then(result=>{
    const user= result.user;
    setUser(user)
    console.log(user)
  })
  .catch((error)=>{
    console.error('error', error);
  })
}


const handelGoogleSigOut=()=>{
  const auth= getAuth();
  signOut(auth)
  .then(()=>{
setUser([]);
  })
  .catch(()=>{
setUser({})
  })

}


const handelGitHubSigIn=()=>{
  const auth = getAuth();
signInWithPopup(auth, githubProvider)
  .then((result) => {
    const user = result.user;
    setUser(user)
  
  }).catch((error) => {

    console.error('error :', error);
    
  });
}



  return (
    <div>
    <div> 
  { user.uid ?  <button onClick={handelGoogleSigOut}>Google Sign out</button> :
    <div>
      <button onClick={handelGoogleSigIn}>Google Sign In</button>   
    <button onClick={handelGitHubSigIn}>Git Hub Sign In</button> 
    </div>  
  }
    </div>
  {user.uid   && <div>
       <p> User Name: {user.displayName}</p>
      <p>Email : {user.email}</p>
      <img src={user.photoURL} alt="" />
      </div> }
    </div>
  );
};

export default App;