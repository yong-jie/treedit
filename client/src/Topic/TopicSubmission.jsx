import React, { Component } from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class TopicSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMessage: '',
    };
    this.isWithinRange = this.isWithinRange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  isWithinRange() {
    return (
      this.state.inputMessage.length > 0 &&
      this.state.inputMessage.length <= 255
    );
  }

  handleOnClick() {
    if (this.isWithinRange()) {
      this.props.makeTopic(this.state.inputMessage);
      this.setState({ inputMessage: '' });
    } else if (this.state.inputMessage.length > 255) {
      alert('Message must be less than 255 characters long!');
    }
  }

  handleOnChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="topicSubmission">
            What&apos;s on your mind today?
          </Label>
          <Input
            type="textarea"
            id="topicSubmission"
            onChange={this.handleOnChange}
            value={this.state.inputMessage}
          />
        </FormGroup>
        <div className="text-right">
          <Button color="success" onClick={this.handleOnClick}>Submit</Button>
        </div>
      </Form>
    );
  }
}

TopicSubmission.propTypes = {
  makeTopic: PropTypes.func.isRequired,
};

export default TopicSubmission;
