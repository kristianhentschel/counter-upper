import React from 'react';
import PropTypes from 'prop-types';

import { Button, Segment } from 'semantic-ui-react';

const FilterSelector = ({
  filter,
  onChangeFiler,
}) => (
  <Segment basic>
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
  </Segment>
);

export default FilterSelector;
