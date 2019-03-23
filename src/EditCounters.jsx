import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Button,
  Input,
  Checkbox,
  Menu,
  List,
  Table,
  Container,
  Divider,
  Modal,
  Header,
  Segment,
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
  <Segment basic textAlign="center">
    <Header icon="cog" content="Counter Settings" />
    <Table unstackable fixed collapsing style={{ display: 'inline-block' }} size="small" compact="very">
      <Table.Body>
        {counters.map(({ name, color, count, hidden }) => (
          <Table.Row key={name} negative={hidden}>
            <Table.Cell textAlign="center">
              <Button
                icon={hidden ? 'eye slash' : 'eye'}
                basic
                onClick={() => onChangeCounterHidden(name, !hidden)}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                disabled={hidden}
                icon="tint"
                color={hidden ? 'grey' : color }
                onClick={() => onCycleCounterColor(name, color)}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                defaultValue={name}
                disabled={hidden}
                style={{ width: '12em' }}
                onBlur={(e) => onChangeCounterName(name, e.target.value)}
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
      <Button primary onClick={onCloseEdit} content="Return" icon="checkmark" />
    </Container>
  </Segment>
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
