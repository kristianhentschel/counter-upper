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

const App = ({
  counters,
  increment,
  decrement,
}) => (
  <Container textAlign="center">
    <Grid columns={2} padded relaxed>
      {counters.map(({ name, count, color }) => (
        <Grid.Column
          onClick={(e) => {
            increment(name);
            e.preventDefault();
          }}
          key={name}
          color={color}
        >
          <Statistic label={name} value={count} />
        </Grid.Column>
      ))}
    </Grid>
    <Divider />
    <Button.Group>
      <Button primary active content="All time" />
      <Button.Or />
      <Button content="This week" />
      <Button.Or />
      <Button content="Today" />
    </Button.Group>
    <Divider />
    <Button icon="cog" labelPosition="left" content="Edit" />
  </Container>
);

App.propTypes = {
  counters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counters: state.counters,
});

const mapDispatchToProps = (dispatch) => ({
  increment: (name) => dispatch({
    type: "INCREMENT",
    name,
  }),
  decrement: (name) => dispatch({
    type: "DECREMENT",
    name,
  }),
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
