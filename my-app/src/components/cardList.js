import axios from "axios";
import React, { Component } from 'react'
import CardService from '../services/cardService'
import authHeader from '../services/auth-header';

class CardList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                cards: [],
                CardName : '',
                search: "",
                search_list:[],
                show:false
        }
        this.saveCard = this.saveCard.bind(this);
    }

    changeSearch = (e)=>{
        
        this.setState({search: e.target.value})
        console.log(this.state.search)
    }

    searchCard=event=>{
        event.preventDefault();
        let search=this.state.search;
        console.log(search);
        axios.get(`http://localhost:8080/searchByName/${this.state.search}`,{ headers: authHeader() })
        .then(response => {
          this.setState({
            search_list: response.data,
            show:true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        
      }

    saveCard = (e) => {
        e.preventDefault();
        if (this.state.CardName.length > 0){
        let card = {name : this.state.CardName};
        CardService.addCard(card).then((res) => {
            let data = res.data;
            let cards = this.state.cards;
            cards.push(data);
            this.setState({cards : cards, CardName : ''})
        })
    }
    }

    changeCardNameHandler= (event) => {
        this.setState({CardName: event.target.value});
    }

    cardView(id){
        this.props.history.push(`/detail/${id}`);
    }
  

    componentDidMount(){
        if (this.state.search ==="") {     
            this.setState({search_list:[]})
            CardService.getCards().then((res) => {
              this.setState({cards: res.data});
          })            
          }
        CardService.getCards().then((res) => {
            this.setState({cards: res.data});
        })
    }
    renderCard = card=>{       
        return <div className=" col-4">
                    <div className="card" style={{width: '22rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">{card.name}</h5>
                            <small className="card-text mr-4">{card.addedDate.slice(0,10)}</small>
                            <button className="btn" style={{background:'#2f4f67', color:'white'}} onClick={()=>this.cardView(card.id)}>Details</button>
                        </div>
                    </div>
                 </div>
    }


    render() {
        const name=this.state.search
        const search_list=this.state.search_list;
        const show=this.state.show;
        return (
            <div>
            { search_list.length>0 || show===true ? <div>
              {search_list.length>0 ?  <div> <div className="row mt-2"> 
              <div class="input-group mb-3">
                        <span class="fa fa-search form-control-feedback"></span>
                            <input type="text" id="search" required value={this.state.search} onChange={this.changeSearch} name="search"  class="form-control" placeholder="Search"/>
                            <div class="input-group-append">
                                  <button type="submit" onClick={this.searchCard} class="btn"  style={{background:'#2f4f67', color:'white'}}>Search</button>
                            </div>
                      </div> 
               <h1 className="conten">Search results :{name}</h1>
                   </div> 
               <div className="row mt-5">
             
               { search_list.map(card=> { 
                        return this.renderCard(card)
               }
                     )
               }
              
          
       </div> </div> : <div>
       <div class="input-group mb-3">
                        <span class="fa fa-search form-control-feedback"></span>
                            <input type="text" id="search" required value={this.state.search} onChange={this.changeSearch} name="search"  class="form-control" placeholder="Search"/>
                            <div class="input-group-append">
                                  <button type="submit" onClick={this.searchCard} class="btn"  style={{background:'#2f4f67', color:'white'}}>Search</button>
                            </div>
                      </div> 
           <h1>Not such card like "{name}" </h1></div>}
            </div> :<div>
            <div className="mt-5">
                
            
            <div class="input-group mb-3">
                        <span class="fa fa-search form-control-feedback"></span>
                            <input type="text" id="search" required value={this.state.search} onChange={this.changeSearch} name="search"  class="form-control" placeholder="Search"/>
                            <div class="input-group-append">
                                  <button type="submit" onClick={this.searchCard} class="btn"  style={{background:'#2f4f67', color:'white'}}>Search</button>
                            </div>
                      </div>             
                
                 <div className="card col-md-6 offset-md-3 offset-md-3">               

                 <div className = "card-body">
                    <form>
                         
                    <div className = "form-group">
                        <input placeholder="Create new card" name="CardName" className="form-control" 
                        value={this.state.CardName} onChange={this.changeCardNameHandler}/>
                    </div>

                    <div className = "form-group">
                        <button className="btn" style={{background: '#8EAF93', color:'white'}} onClick={this.saveCard}>Add New +</button>
                    </div>
                    
                     </form>
                 </div>
                </div>
                 <br></br>

                 <div className = "row mt-3" >                  
                     
                     {
                         this.state.cards.map(
                             card =>{                             
                             return this.renderCard(card)
                             }
                            
                        )
                     }                    
                 </div>

            </div>
            
            </div>}
            </div>
        )
    }
}

export default CardList