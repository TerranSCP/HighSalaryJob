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
        fetch('http://localhost:8080/public/fakejson/',{
            method:'GET',
            mode:'no-cors',
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'application/json'
            }     
    
        }).then((req,res)=>{
            if(res.status === 200){
            res.json().then((data) => {
                this.setState({content:data})
                })
            }
            else{
                console.log(res.status);
            }
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