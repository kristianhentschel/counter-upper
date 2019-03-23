import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Statistic,
  Button,
} from 'semantic-ui-react';

const CountersList = ({
  counters,
  filter,
  onIncrement,
  onDecrement,
}) => (
  <Grid columns={2} padded relaxed>
    {counters.map(({ name, count, color }) => (
      <Grid.Column
        onClick={(e) => {
          onIncrement(name);
          e.preventDefault();
        }}
        key={name}
        color={color}
      >
        <Statistic label={name} value={count} />
        <Button
          floated="left"
          icon="undo"
          onClick={(e) => {
            onDecrement(name);
            e.stopPropagation();
          }}
        />
      </Grid.Column>
    ))}
  </Grid>
);

CountersList.propTypes = {
  counters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      hidden: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counters: state.counters.filter(c => c.hidden !== true),
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: (name) => dispatch({
    type: "INCREMENT",
    name,
  }),
  onDecrement: (name) => dispatch({
    type: "DECREMENT",
    name,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountersList);
