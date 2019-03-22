import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Container, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <Container>
    <Message header="Hello, World" content="Yay!" />
  </Container>
);

export default hot(App);
