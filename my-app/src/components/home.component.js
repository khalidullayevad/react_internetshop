import React, { Component } from "react";


export default class Home extends Component {
  
  render() {
       
    return ( <div>
        <div id="carouselExampleCaptions" class="carousel slide mt-4 mb-4" data-ride="carousel" >
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img style={{height: '400px'}}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJqYXWkQ6rCgsH8gTCnQOWDlPITyYmZ3rog&usqp=CAU" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Manage with your tasks</h5>
                    <button type="button" class="btn" style={{background:'#2f4f67', color:'white'}}>REGISTER NOW</button>
                </div>
                </div>
                <div class="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJqYXWkQ6rCgsH8gTCnQOWDlPITyYmZ3rog&usqp=CAU" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Manage with your tasks</h5>
                    <button type="button" class="btn" style={{background:'#2f4f67'}}>REGISTER NOW</button>
                </div>
                </div>
                <div class="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJqYXWkQ6rCgsH8gTCnQOWDlPITyYmZ3rog&usqp=CAU" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Manage with your tasks</h5>
                    <button type="button" class="btn" style={{background:'#2f4f67'}}>REGISTER NOW</button>
                </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        <table class="table">
       
        <tbody>
        <tr>
            <th scope="row">Quick Access <br/> Fasr and Easy </th>
            <td style={{width:'10%'}}>Mark</td>
            
        </tr>
        <tr>
            <th scope="row">Great Managment <br/> Grouping your tsks</th>
            <td style={{width:'10%'}}>Jacob</td>
            
        </tr>
        <tr>
            <th scope="row">Statistics <br/> Monitoring with your success </th>
            <td style={{width:'10%'}}>Larry</td>
            
        </tr>
        <tr>
            <th scope="row">Cloud Service  <br/> Store your data in cloud </th>
            <td style={{width:'10%'}}>Larry</td>
            
        </tr>
        </tbody>
        </table>
</div>
    )
    
}
}
