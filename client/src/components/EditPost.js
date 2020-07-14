import React, {useState, useEffect} from 'react';
import EditCard from './EditCard'
import axios from 'axios';

export default function App() {
    const [ posts, setPosts] = useState([
    ])
    const [ postEdit, setPostEdit] = useState({
        id:'',
        title:'',
        contents:''
    });
  
    const editHandler = e => {
        axios
        .get(`http://localhost:3000/api/posts/${e.target.id}`)
        .then(res => setPostEdit(res.data))
        .catch( err => console.log("Error", err.message, err.response))
    }

    useEffect(()=>{
        axios
        .get("http://localhost:3000/api/posts")
        .then(res => setPosts(res.data))
        .catch( err => console.log("Error", err.message, err.response));
      },[])


return (
    <div>
     {postEdit.id !== 0  ? <EditCard postToEdit={postEdit}/>: null}
        <div>
            {posts && posts.map(post => 
            (<div  key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.contents}</p>
                <button id={post.id} onClick={editHandler}>Edit</button>
            </div>) 
            )}
        </div>
    </div>
  );
}

