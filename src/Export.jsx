import React from 'react';
import { Button } from 'semantic-ui-react';
import { DateTime } from 'luxon';

function doExport(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `counter-upper-${DateTime.local().toFormat('yyyy-MM-dd')}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const Export = ({
  counters,
}) => (
  <Button onClick={() => doExport(counters)} icon="download" labelPosition="left" content="Export" />
);

export default Export;
