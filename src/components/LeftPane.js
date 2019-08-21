import React, { Component } from 'react'
import { Accordion, Menu } from 'semantic-ui-react'
import {connect} from "react-redux";
import keys from 'lodash/keys';
import {selectReading} from "../redux/actions/readingsActions";

class AccordionExampleMenu extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex })
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion as={Menu} vertical>
        {
          keys(this.props.readings.categories).map((c, i) => (
            <Menu.Item key={c}>
              <Accordion.Title
                active={activeIndex === i}
                content={c}
                index={i}
                onClick={this.handleClick}
              />
              <Accordion.Content active={activeIndex === i}>
                {
                  this.props.readings.categories[c].map(cc => (
                    <div onClick={() => this.props.selectReading(this.props.readings.readings[cc].id)}>{this.props.readings.readings[cc].metadata.title}</div>
                  ))
                }
              </Accordion.Content>
            </Menu.Item>
          ))
        }
      </Accordion>
    )
  }
}

const mapStateToProps = (state) => ({
  readings: state.readings,
});

export default connect(mapStateToProps, {selectReading})(AccordionExampleMenu);