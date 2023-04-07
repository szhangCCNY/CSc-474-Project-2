import logo from './logo.svg';
import axios from 'axios';
import './App.css';

let jsonDatas;

function buttonHandler(){
  axios.get("http://localhost:8000/getdata").then(res => {
    jsonDatas = res.data;
    console.log(jsonDatas);
  })
}

function App() {
  return (
    <button onClick={buttonHandler}>click me</button>
  );
}

export default App;
