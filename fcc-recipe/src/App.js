import React, { Component } from 'react';
import './App.css';
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

class App extends Component {
state ={
  recipes:[
      {recipeName:'Sky1',ingredients:['SJTUer1','Charming','MEGA SMART']},
      {recipeName:'Sky2',ingredients:['SJTUer2','Charming','MEGA SMART']},
      {recipeName:'Sky3',ingredients:['SJTUer3','Charming','MEGA SMART']}
  ],
    showAdd: false
}

//Delete a recipe
deleteRecipe(index){
let recipes=this.state.recipes.slice();
recipes.splice(index,1);
this.setState({recipes});
}

//Closes a modal
close = () => {
  if(this.state.showAdd) {
      this.setState({showAdd: false})
  }
}

open =(state)=>{

}

  render() {
    const{recipes}= this.state;
    return (
        <div className="App container">
        <Accordion>
          {recipes.map((recipe,index) => (
<Panel header={recipe.recipeName} eventkey={index} key= {index}>
<o1>
       {recipe.ingredients.map((item)=>(
           <li key={item}> {item} </li>
       ))}
</o1>
<ButtonToolbar>
<Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe</Button>
      <Button bsStyle="default">Edit Recipe</Button>
      </ButtonToolbar>
</Panel>


          ))}
        </Accordion>

<Modal show={this.state.showAdd} onHide ={this.close}>

  </Modal>


          <Button bsStyle="primary" onClick ={(event)=>this.open("showAdd")}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
