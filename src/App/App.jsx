import React , {Component} from "react";
import MainSurface from "../MainSurface/MainSurface.jsx"
const path = require('path')




class App extends React.Component {
    

    constructor(props){
        super(props);
        this.state = {
            name:"hightsalaryjob.com",
            content:''
        }
    }

    componentDidMount(){
        fetch('http://127.0.0.1:8080/fakejson/data.json',{
            method:'GET',
            mode:'no-cors',
            headers:{
                'Access-Control-Allow-Origin':'127.0.0.1',
                'Access-Control-Allow-Headers':'application/json'
            }     
    
        }).then((req,res)=>{
           
            
                //this.setState({content:res})
                console.log(res)
                
            
        
        }).catch((err)=>{
            throw new Error(`Something goes wrong ${err}`)
        })
        
    }

    render(){
        return(
            <div>
                <h1 > Welcome to the : {this.state.name}  </h1>
                <MainSurface content = {this.state.content}/>
            </div>
           
        );
    }
}

export default App;