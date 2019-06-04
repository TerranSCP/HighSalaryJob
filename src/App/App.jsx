import React , {Component} from "react";

class App extends React.Component {

    constructor(props){
      this.props.name = this.props.name 
    }


    render(){
        return(
            <div>
                <h1 > Welcome to the hightsalaryjob.com </h1>
            </div>
        );
    }
}

export default App;