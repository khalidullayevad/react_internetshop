import React, { Component } from 'react'
import CardService from '../services/cardService'

export default class CardEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id_param: this.props.match.params.id,
            id : '',
            name : '',
            addedDate : '',
            card : NaN,
        }

        this.deleteCard = this.deleteCard.bind(this)

    }

    changeHandler= (event) => {
        console.log(event.target.value)
        this.setState({name: event.target.value});
    }

    componentDidMount(){
        CardService.getOneCard(this.state.id_param).then((res)=>{
            let data = res.data; 
            this.setState({
                id : data.id,
                name : data.name,
                addedDate : data.addedDate,
                card : data
            })
        })
    }

    updateCard = (e) => {
        e.preventDefault();
        let card = this.state.card
        card.name = this.state.name
        console.log(JSON.stringify(card) + " -----------------")
        CardService.updateCard(card);
        this.props.history.push('/');
    }

    deleteCard(id){
        console.log(id  + " idid")
        CardService.deleteCard(id);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3 offset-md-3 mt-3">
                    <div className = "card-body">
                    <form>

                    <div className = "form-group">
                    <label> Task ID: </label>
                    <input className="form-control" readOnly value={this.state.id} />
                    </div>

                    <div className = "form-group">
                    <label> Task NAME: </label>
                    <input className="form-control" value={this.state.name} onChange={this.changeHandler}/>
                    </div>

                    <div className = "form-group">
                    <label> Task DATE: </label>
                    <input className="form-control" readOnly value={this.state.addedDate} />
                    </div>
                            

                    <div className="row">
                        <div className = "form-group">
                            <button className="btn btn-primary" onClick={this.updateCard}>UPDATE</button>
                        </div>

                        <div className = "form-group ml-3">
                            <button className="btn btn-danger" onClick={()=>this.deleteCard(this.state.id)}>DELETE</button>
                        </div>
                    </div>
                    
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
