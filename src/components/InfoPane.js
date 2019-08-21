import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import _ from 'lodash';
import {Popup, Progress} from "semantic-ui-react";
import renderHTML from 'react-render-html'
class InfoPane extends Component {

  render() {
    const url = _.findKey(this.props.readings, { id: this.props.selectedReading});
    console.log(url);
    return (
      <div style={{ display: 'flex' }}>
        <div className="Metadata-pane">
          <div className="Metadata-info-pane">
            <div className="Metadata-title">{this.props.readings[url].metadata.title}</div>
            <a href={this.props.readings[url]['retrieved_url']} target="_blank" className="Metadata-URL">{this.props.readings[url]['retrieved_url']}</a>
            <div className="Metadata-subinfo">
              <div className="Metadata-subinfo-item">{this.props.readings[url].metadata.authors.length > 0 ? this.props.readings[url].metadata.authors[0].name: 'No Author'}</div>
              <div className="Metadata-subinfo-item">{this.props.readings[url].metadata.publication_date}</div>
              <div className="Metadata-subinfo-item">{this.props.readings[url].language}</div>
            </div>
          </div>
          <h4 className={'Keywords-title'}>Keywords</h4>
          <div className="Keywords-container">
            {
              this.props.readings[url].keywords.map(k => (
                <Popup content={k.relevance} trigger={<div className={'Keywords'}>#{k.text}</div>} />
              ))
            }
          </div>
          <h4 className={'Keywords-title'}>Categories</h4>
          <div className="Categories-container">
            {
              this.props.readings[url].categories.map(c => (
                <div>
                  <div className={'Category-pills'}>
                    {
                      _.slice(c.label.split('/'), 1).map(o => (
                        <div className={'Category'}>{o}</div>
                      ))
                    }
                  </div>
                  <Popup
                    content={c.score * 100}
                    trigger={<Progress percent={c.score * 100} indicating />}
                    inverted
                    size='tiny'
                    style={style}
                    position='bottom center'
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="HTML-pane">
          <div className={'Concept-container'}>
            <h3>Concept</h3>
            {
              this.props.readings[url].concepts.map(c => (
                <Popup
                  content={c.relevance}
                  trigger={
                    <a className={'Concept'} href={c.dbpedia_resource} target={'_blank'}>{c.text}</a>
                  }
                  inverted
                  size='tiny'
                  style={style}
                  position='bottom center'
                />
              ))
            }
          </div>
          <div>
            {
              _.keys(this.props.readings[url].emotion.document.emotion).map(e => (
                <div>
                  <h4>{e}</h4>
                  <Popup
                    content={this.props.readings[url].emotion.document.emotion[e]*100}
                    trigger={<Progress percent={this.props.readings[url].emotion.document.emotion[e]*100} indicating />}
                    inverted
                    size='tiny'
                    style={style}
                    position='bottom center'
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

InfoPane.propTypes = {};

const mapStateToProps = (state) => ({
  readings: state.readings.readings,
  selectedReading: state.readings.selectedReading,
  readingHTML: state.readings.readingHTML
});

export default connect(mapStateToProps, {})(InfoPane);

const style = {
  borderRadius: 0,
  opacity: 0.8,
  padding: '1em',
};