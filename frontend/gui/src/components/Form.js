import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


class CustomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      description: '',
    };
  }
  mySubmitHandler = (event, requestType, articleID) => {
    event.preventDefault();
    alert("You are submitting " + this.state.title + this.state.content + this.state.description + requestType);
    switch ( requestType ) {
      case 'post':
        return axios.post('http://127.0.0.1:8000/api/', {
          title: this.state.title,
          content: this.state.content,
          description: this.state.description
        })
        .then(res => console.log(res))
        .catch(error => console.err(error));
      case 'put':
            return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
              title: this.state.title,
              content: this.state.content,
              description: this.state.description
            })
            .then(res => console.log(res))
            .catch(error => console.err(error));

        }
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
      
      <form onSubmit={(ev) => this.mySubmitHandler(ev, 
        this.props.requestType,
        this.props.articleID)}>
      <p>Enter Title</p>
      <input type='text'  name='title' onChange={this.myChangeHandler} />
      <p>Enter Content :</p>
      <input type='text' name='content' onChange={this.myChangeHandler} />
      <p>Enter Description :</p>
      <input type='text' name='description' onChange={this.myChangeHandler} />
      <input type='submit' value={this.props.btnTxt} />
      </form>
    );
  }
}


export default CustomForm;

