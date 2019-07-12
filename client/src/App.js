import React, {Component} from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    posts: [],
    title: '', 
    contents: '',
    id: ''
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        console.log(res)
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeHandler = (e) => {
    e.preventDefault()
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  getData = () => {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        console.log(res)
        this.setState({
          posts: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addPost = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:4000/api/posts`, {title: this.state.title, contents: this.state.contents})
      .then(res => {
        console.log(res)
        this.getData();
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({
      title: '',
      contents: ''
    })
  }

  deletePost = (e) => {
    e.preventDefault()
    console.log(e.target.id)

    axios
      .delete(`http://localhost:4000/api/posts/${e.target.id}`)
      .then(res => {
        console.log(res)
        this.getData();
      })
      .catch(err => {
        console.log(err)
        this.getData();
      })
  }

  updatePost = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    axios
      .put(`http://localhost:4000/api/posts/${e.target.id}`, {title: this.state.title, contents: this.state.contents})
      .then(res => {
        console.log(res)
        this.getData()
      })
      .catch(err => console.log(err))
      this.setState({
        title: '',
        contents: ''
      })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div>
        <form>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="contents"
            placeholder="contents"
            value={this.state.contents}
            onChange={this.changeHandler}
          />
          <button onClick={this.addPost}>Add Post</button>
        </form>
        {this.state.posts.map(post => (
          <div>
            <h2>{post.title}</h2>
            <h3>{post.contents}</h3>
            <button onClick={this.deletePost} id={post.id}>Delete</button>
            <button onClick={this.updatePost} id={post.id}>Update</button>
          </div>
        ))}
      </div>
    )
  }
}

export default App;
