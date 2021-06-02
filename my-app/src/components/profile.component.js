import React, { Component } from "react";


import AuthService from "../services/auth.service";
import DataService from "../services/user.service";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    // this.handleUpdateFullname = this.handleUpdateFullname.bind(this);
    // this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRPassword = this.onChangeRPassword.bind(this);
    this.onChangeOPassword = this.onChangeOPassword.bind(this);
    this.updateFullname = this.updateFullname.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      username: AuthService.getCurrentUser().username,
      password: "",
      rpassword:"",
      opassword:"",
      successful: false,
      message: "",
      passwordfromd:AuthService.getCurrentUser.password,
  
    };
   
  }
   onChangeFullname(e) {
        this.setState({
          fullname: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
          });
    }
    onChangeRPassword(e){
        this.setState({
            rpassword: e.target.value
          });
    }
    onChangeOPassword(e){
        this.setState({
            opassword: e.target.value
          });
    }
    updateFullname(e){
        e.preventDefault();
        console.log(this.state.username)
        console.log(this.state.currentUser)
        var newUser={
            id:AuthService.getCurrentUser().id,
            username:this.state.username,
            email:AuthService.getCurrentUser().email,
            password:AuthService.getCurrentUser().password
        }
       
        DataService.updateFullname(newUser)
        .then(response => {
          this.setState({
            currentUser:response.data
          });
          console.log(response.data)
         
          AuthService.getCurrentUser().username=this.state.currentUser.username
          var newUser1=AuthService.getCurrentUser()
          newUser1.username=this.state.username
          console.log(newUser1)

          
          AuthService.setCurrentUser(newUser1)
          this.setState({
            currentUser:AuthService.getCurrentUser(),
            username:AuthService.getCurrentUser().username
          })
          var proverka=AuthService.getCurrentUser()
          console.log(proverka)
          window.location.replace(`/profile`)
        })
        .catch(e => {
          console.log(e);
        });
        
    }
    getPassword(){
        DataService.getPassword()
        .then(response => {
          this.setState({
            passwordfromd: response.data,
           
          });
          console.log(response.data);
         
        })
        .catch(e => {
          console.log(e);
        });
    }
    async updatePassword(e){
       
        e.preventDefault();
     
       
       
        if(this.state.rpassword===this.state.password){
           
               
                var newUser={
                  oldpassword:this.state.opassword,
                  newpassword:this.state.password
                }
                
                DataService.updatePassword(newUser)
                .then(response => {
                  this.setState({
                    message:response.data
                  });
                  console.log(response.data);
                  if(this.state.message=="success"){
                    alert("password changes")
                }
                else {
                  alert("old password is not correct")
                }
                this.setState({
                  passwordfromd:"",
                  opassword:"",
                  rpassword:"",
                  password:""})
                })
                .catch(e => {
                  console.log(e);
                });
                
            
            
        }
        else{
            alert("Passwords are not same  ")
        }
        
        
        
    }

  render() {
    const { currentUser } = this.state;
   

    return (
      <div className="container">
          <div className="row">
              {/* <div className="col md-6 d-flex justify-content-center">
                  <h3>Update Profile Data</h3>
              </div> */}
          </div>
          <form>
                <div className="row mt-3 d-flex justify-content-center">
                    <div className="col-md-4 ">
                    <input type ="email"  className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"  readOnly placeholder="Email" value={currentUser.email}></input>
                    </div>
                    
                </div>
                {/* <div className="row mt-2 justify-content-center">
                    <div className="col-4 ">
                    <input type ="text"  name="username" onChange={this.onChangeFullname} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Fullname"  value={this.state.username}></input>
                    </div>
                    
                </div>
                <div className="row mt-3 d-flex justify-content-center" >
                    <button className="btn " style={{backgroundColor:'#154360',color:'white'}} onClick={this.updateFullname}>Update Profile</button>
                </div> */}
         
          </form>
          
          <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-md-3">
                        <h3>Update Password </h3>
                    </div>
                </div>
          <form>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-4 ">
                    <input type ="password" name="opassword" onChange={this.onChangeOPassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Old Password" value={this.state.opassword}></input>
                    </div>
                    
                </div>
                
                <div className="row mt-2  d-flex justify-content-center">
                    <div className="col-4">
                    <input type ="password" name="rpassword"  onChange={this.onChangePassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Password" value={this.state.password}></input>
                    </div>
                    
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-4 ">
                        <input type ="password"  name="rpassword" onChange={this.onChangeRPassword} className="form-control  border-top-0 border-left-0 border-right-0 border-bottom"   placeholder="Repeat Password"  value={this.state.rpassword}></input>
                    </div>
                    
                </div>
                <div className="row mt-5 d-flex justify-content-center">
                    <button className="btn  " style={{backgroundColor:'#154360',color:'white'}} onClick={this.updatePassword}>Update Password</button>
                </div>
         
          </form>
          
      </div>
    );
  }
}