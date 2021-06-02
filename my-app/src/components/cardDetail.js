import React, { Component } from 'react'
import CardService from '../services/cardService'
// import { MDBSwitch } from "mdbreact";


class CardDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            card_id : NaN,
            name : '',
            date : '',
            tasks : [],
            switch: true,
            taskName : ''
        }
        this.deleteCard = this.deleteCard.bind(this)
        this.editPage = this.editPage.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
    }
    deleteCard(id){
        console.log(id  + " idid")
        CardService.deleteCard(id);
        this.props.history.push('/');
    }

    changeTaskHandler= (event) => {
        this.setState({taskName: event.target.value});
    }

    handleSwitchChange(){
        this.setState({
            switch: !this.switch
        });
    }

    saveTask = (e) => {
        e.preventDefault();
        if (this.state.taskName.length > 0){
            let task = {id : this.state.id, taskText : this.state.taskName, done : false}
            CardService.addTask(task).then((res) =>{
                let data = res.data;
                let tasks = this.state.tasks;
                tasks.push(data);
                this.setState({tasks : tasks})
            })
        }
    }

    checkBox(boolean){
        if (boolean === true){
            return "checked"
        }
    }

    componentDidMount(){
        CardService.getOneCard(this.state.id).then((res) => {
            let data = res.data;
            let card_id = data.id;

            CardService.getTasks(card_id).then((res2) => {
                let data_tasks = res2.data;
                console.log(data_tasks)
                this.setState({
                    card_id  : data.id,
                    id : data.id,
                    name : data.name,
                    date : data.addedDate,
                    tasks : data_tasks
                })
            })
        })
    }

    editPage (){
        let id = this.state.id;
        this.props.history.push(`/edit/${id}`);
        console.log(this.state.id + " _---")
    }

    updateStatus(id){
        console.log(id + " id")
        CardService.updateStatus(id);
    }

    render() {
        return (
            <div>

                <div class="jumbotron jumbotron-fluid mt-4 pl-2 pr-2">
                <div class="container">
                    <h7 className="display-4">{this.state.name}</h7>
                    <p>{this.state.date}</p>
                    <div className="row">
                        <div className="col-1">
                            <button className="btn"style={{background:'#2f4f67', color:'white'}}  onClick={this.editPage}>EDIT
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger"  onClick={()=>this.deleteCard(this.state.id)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                </div>
                </div>

                <div className="card col-md-12 offset mb-4">

                 <div className = "card-body ">
                    <form>
                         
                    <div className = "form-group">
                       
                        <input placeholder="Create new Task" name="CardName" className="form-control" 
                        value={this.state.taskName} onChange={this.changeTaskHandler}/>
                    </div>

                    <div className = "form-group">
                        <button className="btn "  style={{background: '#8EAF93', color:'white'}} onClick={this.saveTask}>Add New +</button>
                    </div>
                    
                     </form>
                 </div>
                 </div>
                
                {
                    this.state.tasks.map(task =>
                        <div className="card col-md-12 offset mb-4">
                            <div className = "card-body">
                                <form>
                                <div className = "form-group">
                                    <p className="card-title">{task.taskText}</p>
                                    <small className="card-title">{task.addedDate}</small>
                                    <div class="form-check form-switch">
                                    
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked={this.checkBox(task.done)} onClick={this.updateStatus(task.id)} />
                                    <label class="form-check-label" for="flexSwitchCheckChecked">DONE</label>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    )
                }               
            </div>
        )
    }
}

export default CardDetail