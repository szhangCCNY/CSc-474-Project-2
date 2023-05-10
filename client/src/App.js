import logo from './logo.svg';
import axios from 'axios';
import React from 'react';
import './App.css';

import SWOT from './pages/SWOT';
import Summation from './pages/Summation';


// let jsonDatas;
// state to keep track of
const scriptURL = ["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js", "https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.js"];
let scriptsLoaded = 0;

function handleAllScriptLoaded(){
  console.log("YOU CAN NOW HIT UPDATE");
}

for(let i = 0; i < scriptURL.length; i += 1) {
  const script = document.createElement('script');
  script.onload = () => {
    scriptsLoaded += 1;
    if (scriptsLoaded === scriptURL.length) {
      window.onload = handleAllScriptLoaded;
    }
  }
  script.src = scriptURL[i]
  document.head.appendChild(script);
}

// function buttonHandler(){
//   axios.get("http://localhost:8000/getdata").then(res => {
//     jsonDatas = res.data;
//     console.log(jsonDatas);
//   })
// }

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {jsonData:[], panel: false}
    this.buttonHandler = this.buttonHandler.bind(this);
    this.buttonHandler2 = this.buttonHandler2.bind(this);

  }

  buttonHandler(){
    axios.get("http://localhost:8000/getdata").then(res => {
      const data = res.data;
      this.setState({jsonData: data})
    })
  }

  buttonHandler2(){
    this.setState(prevState => ({panel: !prevState.panel}))
  }

  render(){
    console.log(this.state.panel);
    if(!this.state.panel){
      return(
        <div>
          <button onClick={this.buttonHandler}>UPDATE</button>
          <button onClick={this.buttonHandler2}> switch panel </button>
          <SWOT data={this.state.jsonData}/>
        </div>
      )
    }
    else{
      return(
        <div>
          <button onClick={this.buttonHandler}>UPDATE</button>
          <button onClick={this.buttonHandler2}> switch panel </button>
          <Summation data={this.state.jsonData}/>
        </div>
      )
    }
  }
}

export default App;
