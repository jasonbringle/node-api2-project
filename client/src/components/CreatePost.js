import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [ info, setInfo] = useState({
    title:'',
    contents:'',
    created_at:'',
    updated_at:''
  })
  
  const [ posts, setPosts] = useState();
  
  const changeHandler = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }
  
  const submitHandler = e => {
    e.preventDefault();
    axios
    .post("https://jason-title-and-content-app.herokuapp.com/api/posts", info)
    .then(res => asyncRefresh())
    .catch(err => console.log("Error", err.message));
    
  }

useEffect(()=>{
  axios
  .get("https://jason-title-and-content-app.herokuapp.com/api/posts")
  .then(res => setPosts(res.data))
  .catch( err => console.log("Error", err.message, err.response));
},[])

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 100);
  });
}

async function asyncRefresh(){
  // eslint-disable-next-line
  const result = await resolveAfter2Seconds()
  const windowRefresh = window.location.reload(true)
  console.log("You deleted it")
  return windowRefresh
}

return (
  <div>
      <div className="App" onSubmit={submitHandler}>
        <form >
          <input type='text' name='title' placeholder="Title" value={info.title}onChange={changeHandler}/>
          <input type='text' name='contents' placeholder="Contents" value={info.contents} onChange={changeHandler}/>
          <button>submit</button>
        </form>
      </div>

      <div>
        {posts && posts.map(post => 
        (<div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.contents}</p>
        </div> ) 
        )}
      </div>
    </div>
  );
}

export default App;
