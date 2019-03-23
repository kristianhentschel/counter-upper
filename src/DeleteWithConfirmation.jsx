import React from 'react';
import {
  Button,
  Modal,
  Label,
  Header,
} from 'semantic-ui-react';

class DeleteWithConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.onOpen = () => this.setState({ open: true });
    this.onClose = () => this.setState({ open: false });
  }

  render() {
    const {
      name,
      count,
      color,
      onConfirmedDelete,
      trigger,
    } = this.props;
    const { open } = this.state;

    return (
      <Modal
        open={open}
        onOpen = {this.onOpen}
        onClose = {this.onClose}
        trigger={trigger || <Button negative basic icon="trash" />}
        size="tiny"
        closeIcon
      >
        <Modal.Header>
          Remove permanently
        </Modal.Header>
        <Modal.Content>
          <Label color={color} content={name} detail={count} style={{ marginBottom: '1em' }} />
          <p>Are you sure you want to delete this?</p>
          <p>This action cannot be undone&mdash;make sure you have exported your data.</p>
        </Modal.Content>
          <Modal.Actions>
            <Button content="No, keep it" onClick={this.onClose} />
            <Button 
              negative
              icon="trash"
              content="Yes, delete it"
              onClick={() => {onConfirmedDelete(); this.onClose(); }}
            />
          </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteWithConfirmation;
