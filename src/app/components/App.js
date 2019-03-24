import React from 'react';
import {connect} from 'react-redux';
import Conversation from'./Conversation';
import { bindActionCreators } from 'redux'
import {sendSocketMessage} from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draft: ''
    }
    this.updateDraft = this.updateDraft.bind(this)
    this.send = this.send.bind(this)
  }

  updateDraft (event) {
    this.setState({ draft: event.target.value })
  }

  send (event) {
    event.preventDefault();
    this.props.sendSocketMessage(this.state.draft);
    this.setState({draft:''});
  }

  render () {
    return (
      <div>
        <ul className='messages'>
        <Conversation messages={this.props.messages} userName="#Pratheek"/>
        </ul>
        <form>
          <input className='m' autoComplete='off' value={this.state.draft} onChange={this.updateDraft} />
          <button onClick={this.send}>Send</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const messages = state.conversations["#Alex"];
  //TODO: #Alex is not supposed to be hardcoded
  //this needs to be fetched from chatList
  return {
    messages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({sendSocketMessage},dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
