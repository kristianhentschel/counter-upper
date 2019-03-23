import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Form,
  Menu,
  List,
  Table,
  Container,
  Divider,
} from 'semantic-ui-react';

import counterColors from './colors';
import DeleteWithConfirmation from './DeleteWithConfirmation';

const EditCounters = ({
  counters,
  onCloseEdit,
  onChangeCounterName,
  onChangeCounterHidden,
  onCycleCounterColor,
  onAddCounter,
  onDeleteCounter,
}) => (
  <Container textAlign="center">
    <Form>
      <Table collapsing style={{ display: 'inline-block' }}>
        <Table.Body>
          {counters.map(({ name, color, count, hidden }) => (
            <Table.Row key={name} negative={hidden}>
              <Table.Cell>
                <Button
                  basic
                  disabled={hidden}
                  icon="circle"
                  color={hidden ? 'grey' : color }
                  onClick={() => onCycleCounterColor(name, color)}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input 
                  defaultValue={name}
                  disabled={hidden}
                  onBlur={(e) => onChangeCounterName(name, e.target.value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Checkbox
                  checked={hidden === true}
                  label="hidden"
                  onChange={(e, data) => { console.log(data); onChangeCounterHidden(name, data.checked); }}
                />
              </Table.Cell>
              <Table.Cell>
                <DeleteWithConfirmation name={name} count={count} color={color} onConfirmedDelete={() => onDeleteCounter(name)} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Container>
        <Button onClick={onAddCounter} content="Add counter" icon="plus" />
      </Container>
      <Divider />
      <Button primary type="submit" onClick={onCloseEdit} content="Return" icon="checkmark" />
    </Form>
  </Container>
);

const mapStateToProps = (state) => ({
  counters: state.counters,
});

const mapDispatchToProps = (dispatch) => ({
  onCloseEdit: () => dispatch({
    type: "SET_EDITING",
    editing: false,
  }),
  onChangeCounterHidden: (name, hidden) => dispatch({
    type: 'SET_COUNTER_HIDDEN',
    name,
    hidden,
  }),
  onCycleCounterColor: (name, color) => dispatch({
    type: 'SET_COUNTER_COLOR',
    name,
    color: counterColors[(counterColors.indexOf(color) + 1) % counterColors.length],
  }),
  onChangeCounterColor: (name, color) => dispatch({
    type: 'SET_COUNTER_COLOR',
    name,
    color,
  }),
  onChangeCounterName: (name, newName) => dispatch({
    type: 'SET_COUNTER_NAME',
    name,
    newName,
  }),
  onAddCounter: () => dispatch({
    type: 'ADD_COUNTER',
  }),
  onDeleteCounter: (name) => dispatch({
    type: 'DELETE_COUNTER',
    name,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCounters);
