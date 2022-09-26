import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import app from './Firebase'

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {from}=location.state || {from :{pathname:"/"}};
  
  const provider = new GoogleAuthProvider();
  const FbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      const signOutUser ={
        isSignedIn : false,
        name: '',
        email: '',
        photo: '' ,
        error:'' ,
        succes:''
      }
      setUser(signOutUser);
    })
    .catch(err =>{
      console.log(err.message);
    })
  };
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  
  let isFieldValid=true;

  const handleBlur = (e)=>{

    if(e.target.name === 'email'){
       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

    }
    if(e.target.name === 'password'){
    const isPassValid = e.target.value.length>6;
    const isPassHasNum = /\d{1}/.test(e.target.value);
    isFieldValid= isPassValid && isPassHasNum ;
    }
    if(e.target.name ==='name'){
      isFieldValid = true;
    }
    if(isFieldValid)
    {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  
  const handleSubmit = (event) =>{
    if(newUser && user.email && user.password){
      const auth= getAuth();
      createUserWithEmailAndPassword(auth,user.email,user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.success=true;
        newUserInfo.error='';
        setUser(newUserInfo);
      })
      .catch((error) => {
       
        const newUserInfo = {...user};
        newUserInfo.success='';
        newUserInfo.error=error.code;
        setUser(newUserInfo);
        updateUser(user.name);

        // const errorCode = error.code;
        // const errorMessage = error.message;
        
        // ..
      });
      }
      if(!newUser && user.email && user.password){
        const auth = getAuth();
signInWithEmailAndPassword(auth, user.email,user.password)
.then(res=>{
  const newUserInfo = {...user};
  newUserInfo.success=true;
  newUserInfo.error='';
  setUser(newUserInfo);
  setLoggedInUser(newUserInfo);
  navigate.replace(from);
  console.log('sign in user info',res.user);
})
.catch((error) => {
 
  const newUserInfo = {...user};
  newUserInfo.success='';
  newUserInfo.error=error.code;
  setUser(newUserInfo);

  // const errorCode = error.code;
  // const errorMessage = error.message;
  
  // ..
});
      }
      event.preventDefault();
  }


  // User Name Update by manage Users
  const updateUser = (name)=>{
    const auth= getAuth();
    updateProfile(auth.currentUser,{
      displayName:name
    }).then(() => {
      console.log("user name update successfully");   
    }).catch((error) => {
      console.log(error)
    });
  }


  // Facebook Handle

  const handleFbSignIn = ()=>{
      const auth = getAuth();
      signInWithPopup(auth, FbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('sign in facebook',user);
    
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
    
        // ...
      });
  }

  return (
    <div style={{textAlign:'center'}}>

      { /* Gmail Authentication */ }
      {
          user.isSignedIn ? (
            <button onClick={handleSignOut}>Sign Out</button>) : (
            <button onClick={handleSignIn}>Sign In with Google</button> )}

      <br />

      {/* Facebook Authentication  */}

      <button onClick={handleFbSignIn}>Sign in With Facebook</button>

      {
      user.isSignedIn && (
        <div>
          <p>Welcome : {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      )}

      {/* My Authentication System */}

      <h2>Our Authentication System</h2>
      <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id="" />
      <label htmlFor="newUser"> New User Sign Up</label>



      <form onSubmit={handleSubmit}>
        { newUser &&  <input type="text" name="name" id="" onBlur={handleBlur} placeholder="Enter Name" /> }        
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
        <br />
        <input type="submit" value={newUser ? 'sign Up': 'sign in'} />
      </form>
        
        {/* Sign In / Creation Message */}

        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success && <p style={{color:'green'}}>User {newUser ? 'created':'log in'} Success</p>
        }

    </div> 
  );
}

export default Login;
