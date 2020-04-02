import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        names:[
          {id:null , firstName:'',lastName:'', ages: [{ age:null }]}
        // {id: 1, firstName:"caped", lastName: "baldy", age:20}, {id: 2, firstName: "demon", lastName: "cyborg", age: 19}
        ]
  }
    this.getNames()
}

  componentDidMount(){
    this.getNames();
  }

  getNames = ()=>{
    fetch("http://localhost:3000/names")
    .then((response)=>{
      if(response.status === 200){ 
        return(response.json()) 
      }
    })
    .then((namesArray)=>{
      this.setState({names: namesArray})
    })
    .then(console.log(this.state.names))
  }

  dataTable = () =>{
    return this.state.names.map((name) => {
      const { id, firstName, lastName, ages} = name
      const age = ages.map(x => x.age);
      console.log("age:", age);
      console.log("name:", name)
      return (
      <tr key={Math.random()}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{age}</td>
      </tr>
      )
    })
  }

  tableHeader() {
    let header = Object.keys(this.state.names[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
}

render(){
  return(
    <div>

      <div align= "center" >
      <h1>Data</h1>
      <table id='names'>
        <tbody align="center">
        <tr>{this.tableHeader()}</tr>
        {this.dataTable()}
        </tbody>
      </table>
      </div>

    </div>
  



    )
  }
}
export default App;
