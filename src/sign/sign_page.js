import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './sign_page.css';
import { Switch, Route, Link, NavLink, withRouter } from 'react-router-dom';

class Sign_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id:'',
          pw:'',
          pw2:'',
          nick:'',
        };
      }

      info_input=(e)=>{ //id인풋시 초기화
          this.setState({ 
              [e.target.name]: e.target.value,
          })
        //   console.log(this.state.[e.target.name]);
      }

      checkID =(e)=>{		
        e.preventDefault();
        console.log(this.state.id);
        const data = {
            id: this.state.id		
        }

        fetch('http://localhost:3001/checkid',{ 
            method:"post",
            headers: { "Content-Type":  "application/json" },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            console.log("asdasdasdasd");
            if(json.tf === true){		
                alert("사용가능한 ID입니다"); 
                this.setState({
                    usingid: true
                })
            }
            else{
                alert("다른 ID를 입력해주세요");
            }
        });
    }

    goSign=(e)=>{
        
    }
    
    
    render() {
        return (
            <div>
                <div className="container">
                    <div className="item">
                        <div className="top_box">
                            <text className="sign_title_text">동규휘제닷컴</text>
                        </div>
                        <div className="sign_sign_box">
                            <text className="sign_sign_text">회원가입</text>
                        </div>
                        <div className="sign_id_box">
                            <text className="sign_id_text">아이디</text>
                            
                        </div>
                        <div className="sign_id_inputbox">
                        <input onChange={this.info_input} name='id' className="sign_id_input"/>
                        <button className="sign_id_right">확인</button>
                        </div>
                        <div className="sign_pw_box">
                            <text className="sign_id_text">비밀번호</text>
                        </div>
                        <div className="sign_id_inputbox">
                            <input onChange={this.info_input} name='pw' className="sign_id_input"/>
                        </div>
                        <div className="sign_pw_box">
                            <text className="sign_id_text">비밀번호 확인</text>
                        </div>
                        <div className="sign_id_inputbox">
                            <input onChange={this.info_input} name='pw2' className="sign_id_input"/>
                            <button className="sign_id_right">확인</button>
                        </div>
                        <div className="sign_pw_box">
                            <text className="sign_id_text">닉네임</text>
                        </div>
                        <div className="sign_id_inputbox">
                            <input onChange={this.info_input} name='nick' className="sign_id_input"/>
                            <button className="sign_id_right">확인</button>
                        </div>
                        <div className="sign_enterbottonbox">
                            <button className="sign_enterbotton" onClick={this.goSign}>가입</button>
                        </div>
                        <div className="sign_blank">

                        </div>
                        <div className="sign_bottom_box">
                            <a href="/" className="sign_bottom_text" onClick={this.goSign}>로그인 화면으로</a>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}



export default Sign_page;