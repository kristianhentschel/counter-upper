import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import {
  Grid,
  Statistic,
  Container,
  Divider,
  Button
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import CountersList from './CountersList';
import EditCounters from './EditCounters';

const App = ({
  counters,
  filter,
  editing,
  onIncrement,
  onDecrement,
  onEdit,
  onChangeFilter,
}) => {
  if (editing) return <EditCounters />;
  
  return (
    <Container textAlign="center">
      <CountersList />
      <Divider />
      <Button.Group>
        <Button
          content="All time"
          primary={filter === 'all'}
          onClick={() => onChangeFilter('all')}
        />
        <Button.Or />
        <Button
          content="This week"
          primary={filter === 'week'}
          onClick={() => onChangeFilter('week')}
        />
        <Button.Or />
        <Button
          content="Today"
          primary={filter === 'day'}
          onClick={() => onChangeFilter('day')}
        />
      </Button.Group>
      <Divider />
      <Button icon="cog" labelPosition="left" content="Edit" onClick={() => onEdit()} />
    </Container>
  );
};


const mapStateToProps = (state) => ({
  filter: state.filter,
  editing: state.editing,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (filter) => dispatch({
    type: "SET_FILTER",
    filter,
  }),
  onEdit: (editing) => dispatch({
    type: "SET_EDITING",
    editing: true,
  }),
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
