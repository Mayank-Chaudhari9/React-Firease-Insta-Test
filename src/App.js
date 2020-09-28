import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';

import './App.css';
import Post from './Post'
import { db, auth } from './firebase'
import Modal from '@material-ui/core/Modal';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const signUp = (event) => {

}

function App() {
  const [posts, setPosts] = useState([
    //static way of setting the state
    /* {
         username="Test1",
         caption=" Wow image1",
          imageUrl="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753"
     }*/
    /*
    {
      username="Rest1",
       caption=" Wow image2",
        imageUrl="https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg"
    
    }  */

  ]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // if any change in authentication state (login/logout)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {

      if (authUser) {
        // user has logged in ..
        console.log(authUser);
        setUser(authUser);

        // now this is j=handeled in "createUserWithEmailAndPassword" for simplicity
        /*if (authUser.displayName) {
          //dont update username

        } else {
          //if we just created someone
          return authUser.updateProfile({
            displayName: username,
            //
          });
        }*/

      } else {
        // user has logged out
        setUser(null);
      }
    })
    return () => {
      // perform some cleanup actions (else this will refire each time the state change)
      unsubscribe();
    }
  }, [user, username]);

  //use effect runs a piece of code based on a specific condition

  useEffect(() => {
    //this is where the code runs
    //if it it is left blank it will change only once
    //onSnapshot is a very strong listner
    db.collection('posts').onSnapshot(snapshot => {
      // everytime a new post is added , this code fires..this is due to snapshot
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  const signUp = (event) => {
    //this is to stop refresh of form
    event.preventDefault();

    //this is getting this from state variable
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }


  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>Sign up</Button>

          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
          // all this will be available once we are  not logged in
          <div className="app__loginContainer">

            <Button onClick={() => setOpen(true)}> Sign up</Button>
          </div>
        )}
      <h1>Hello Clever Programmer Let's Build an Instagram Clone with React 🚀!</h1>
      {
        posts.map(post => (
          //passing props to the component
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      {/*<Post username="Test1" caption=" Wow image1" imageUrl="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" />
      <Post username="Rest1" caption=" Wow image2" imageUrl="https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg" />
      <Post username="Zest1" caption=" Wow image3" imageUrl="https://m.media-amazon.com/images/I/41O7rfn2MPL.jpg" />
    */}
      {/* Header  */}

      {/* posts */}
      {/* posts */}
    </div>
  );
}

export default App;
