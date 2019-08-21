import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import LeftPane from "./LeftPane";
import {Form} from "semantic-ui-react";
import { connect } from 'react-redux';
import {addReading} from "../redux/actions/readingsActions";
import InfoPane from "./InfoPane";

class App extends React.Component {

  state ={
    url: '',
  };

  handleFormSubmit = () => {
    this.props.addReading(this.state.url);
    this.setState({
      url: ''
    })
  };

  handleInputChange = (e) => {
    this.setState({
      url: e.target.value
    });
  };

  render(){
    return(
      <div className={'App'}>
        <div className="App-header">
          <h1 >Organize Your Readings</h1>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Input
              placeholder='Search...' value={this.state.query} onChange={this.handleInputChange}
              className={'Input-field'}
              loading={this.props.readings.loading}
            />
          </Form>
        </div>
        <div className={"View-container"}>
          <div className="Left-pane">
            <LeftPane />
          </div>
          {
            this.props.readings.selectedReading &&
            <div className="Info-pane">
              <InfoPane reading={this.props.readings.selectedReading} />
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  readings: state.readings
});

export default connect(mapStateToProps, {addReading})(App);
