import React from 'react';
import { Route, BrowserRouter as Router, NavLink, Link } from 'react-router-dom';
import './App.css';
import { getHotList, askQuestion, saveAnswer } from './service';
import HotList from './components/HotList'
import Ask from './components/Ask'
import ViewQuestion from './components/ViewQuestion';
import Register from './components/Register';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.refetchHotList()
  }
  state = {

  };
  refetchHotList() {
    getHotList()
      .then(hotlist => {
        this.setState({ hotlist: hotlist.result.Items })
      })
  }
  onRegister(history) {
    console.log('New user registered')
    history.push('/')
  }
  onNameChange(e, history) {
    this.setState({ name: e.nativeEvent.target.value })
  }
  onSaveQuestion(question, history) {
    askQuestion({ question, asker: this.state.name })
      .then(() => {
        this.refetchHotList()
        history.push('/')
      }, err => {
        console.error('failed to get questions', err)
      })
  }
  onSaveAnswer(answer, history) {
    console.log('fetchsave the answermobileyo', answer);
    saveAnswer({ questionId: answer.questionId, answer: answer.answer, person: this.state.name })
      .then(data => {
        this.refetchHotList()
        history.push('/')
      }, err => {
        console.error('failed to save', err);
      })
  }
  render() {
    const VIEWS = {
      active: (<div>
        <Route path="/" exact render={() => (<HotList list={this.state.hotlist}></HotList>)} />
        <Route path="/ask" render={({ history }) => (<Ask onSave={(e) => this.onSaveQuestion(e, history)} />)} />
        <Route path="/q/:id" render={({ match, history }) => {
          const question = this.state.hotlist.find(q => q.id === match.params.id);
          return (<ViewQuestion question={question} onAnswer={(e) => this.onSaveAnswer(e, history)} />)
        }} />
        <Route path="/register" render={({ history }) => (<Register onRegister={() => this.onRegister(history)} onChange={(e) => this.onNameChange(e)} />)} />
      </div>),
      loading: (<div className="content loader">
        Loading FAQ...
      </div>)
    }
    let activeView;
    if (!this.state.hotlist) {
      activeView = VIEWS['loading'];
    } else {
      activeView = VIEWS['active']
    }
    let greetOrRegister;
    if (this.state.name) {
      greetOrRegister = (<span className='greeting'>Hello {this.state.name}</span>)
    } else {
      greetOrRegister = (<span className='greeting'><Link to="/register">Register</Link></span>);
    }
    return (
      <Router>
        <header className="App-header">
          <span className='title'>FAQ</span>
          <span className="nav">
            <NavLink exact to="/">HOT </NavLink>
            <NavLink to="/ask">ASK</NavLink>
          </span>
          {greetOrRegister}
        </header>
        {activeView}
      </Router>
    );
  }
}
export default App;
