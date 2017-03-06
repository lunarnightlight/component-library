import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { BarData } from '../src';

const displayName = BarData.displayName || 'BarData';
const title = 'Simple usage';
const description = `
  Fetch of ORSTAR campaign finance data.`;

const demoCode = () => (
  <BarData />
);

const propDocs = { inline: true, propTables: [BarData] };

export default () => storiesOf(displayName, module)
  .addWithInfo(
    title,
    description,
    demoCode,
    propDocs,
  );
