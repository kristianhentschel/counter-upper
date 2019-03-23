import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import {
  Grid,
  Statistic,
  Container,
  Divider,
  Button,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import CountersList from './CountersList';
import EditCounters from './EditCounters';
import FilterSelector from './FilterSelector';

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
    <Segment basic textAlign="center">
      <CountersList />
      { false
        ? <FilterSelector filter={filter} onChangeFilter={onChangeFilter} />
        : null
      }
      <Divider />
      <Button icon="cog" labelPosition="left" content="Edit" onClick={() => onEdit()} />
    </Segment>
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
