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
  recipes :[
      {recipeName:'Sky1',ingredients:['SJTUer1','Charming','MEGA SMART']},
      {recipeName:'Sky2',ingredients:['SJTUer2','Charming','MEGA SMART']},
      {recipeName:'Sky3',ingredients:['SJTUer3','Charming','MEGA SMART']}
  ],
    showAdd : false,
    newestRecipe :{recipeName:"",ingredients:[]}
}

//Delete a recipe
deleteRecipe(index){
let recipes=this.state.recipes.slice();
recipes.splice(index,1);
this.setState({recipes});
}
//Update newestRecipe
updateNewRecipe(recipeName ,ingredients){
  this.setState({newestRecipe:{recipeName: recipeName,ingredients:ingredients}} );
}
//Save a new recipe to recipes
saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({recipeName:this.state.newestRecipe.recipeName,ingredients:this.state.newestRecipe.ingredients } );

    this.setState({recipes});
    this.setState({newestRecipe: {recipeName: '', ingredients: []}});
    this.close();
}

//Closes a modal
close = () => {
  if(this.state.showAdd) {
      this.setState({showAdd: false})
  }
}

//Open a modal
open =(state)=>{
this.setState({[state] : true});
}

  render() {
    const{recipes,newestRecipe}= this.state;
    console.log(newestRecipe);
    return (
        <div className="App container">
          (recipes.length>0 &&(
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
          ))


<Modal show={this.state.showAdd} onHide ={this.close}>
<Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
          <Modal.Body>
            <FormGroup controlId="formBasicTest">
              <ControlLabel>Recipe Name</ControlLabel>
              <FormControl
              type ="text"
              value={newestRecipe.recipeName}
              placeholder="Enter Recipe Name"
              onChange ={(event)=>this.updateNewRecipe(event.target.value,newestRecipe.ingredients)}
      ></FormControl>
      <FormGroup controlId="formControlsTestarea">
          <ControlLabel>Recipe Name</ControlLabel>
      <FormControl
      type ="textarea"
      value={newestRecipe.recipeName}
      placeholder="Enter Ingredients (Seperate By Commas)"
      onChange ={(event)=>this.updateNewRecipe(newestRecipe.recipeName,event.target.value.split(","))}
      value={newestRecipe.ingredients}
      ></FormControl>
      </FormGroup>
      </FormGroup>
      </Modal.Body>
          <Modal.Footer>
          <Button onClick-{(event)=>this.saveNewRecipe()}></Button>
      </Modal.Footer>
      </Modal.Header>
  </Modal>


          <Button bsStyle="primary" onClick ={(event)=>this.open("showAdd")}>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
