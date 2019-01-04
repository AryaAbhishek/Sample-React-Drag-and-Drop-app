import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {        
    tasks: [
            {name:"Learn React",category:"todo",bgcolor: "yellow"},  
            {name:"Learn BackBone", category:"todo",bgcolor:"green"},  
            {name:"Learn JavaScript",category:"inprocess",bgcolor:"red"},
            {name:"javascript-app",category:"todo",bgcolor: "yellow"},  
            {name:"BackBone-app", category:"inprocess",bgcolor:"green"},  
            {name:"react-app",category:"complete",bgcolor:"red"}          
      ]}
      onDragStart = (ev, id)=>{
        console.log("dragstart:",id);
        ev.dataTransfer.setData("id",id);
      }
      onDragOver = (ev) =>{
        ev.preventDefault();
      }
      onDrop = (ev, cat) => {       
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                     task.category = cat;           
            }              
             return task;       
         });        
         this.setState({           
            ...this.state,           
            tasks       
         }); } 
      render() {        
        var tasks = { todo: [], 
                      inprocess: [],
                      complete: []       
        }         
        this.state.tasks.forEach ((t) => {               
          tasks[t.category].push(<div 
            key={t.name}                     
            onDragStart={(e)=>this.onDragStart(e, t.name)}                    
            draggable                    
            className="draggable"                    
            style={{backgroundColor: t.bgcolor}}>                       
               {t.name}                
          </div>);        
        });
        return (<div className="container-drag">
          <h2 className="header">DRAG & DROP DEMO</h2>                  
          <div className="todo"
            onDragOver={(e)=>this.onDragOver(e)}                   
            onDrop={(e)=>{this.onDrop(e, "todo")}}>                    
            <span className="task-header">ToDo</span>                    
            {tasks.todo}                
          </div>
          <div className="inprocess"
            onDragOver={(e)=>this.onDragOver(e)}                    
            onDrop={(e)=>{this.onDrop(e, "inprocess")}}>                    
            <span className="task-header">InProcess</span>                    
            {tasks.inprocess}                
          </div>                
          <div className="complete"
            onDragOver={(e)=>this.onDragOver(e)}                    
            onDrop={(e)=>this.onDrop(e, "complete")}>                     
            <span className="task-header">COMPLETED</span>                     
            {tasks.complete}                
          </div>              
      </div>);
      }
}

export default App;