import React from 'react';
import { Card, PageState, Spinner } from '@paperwork/ui-widgets';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './TrendCard.scss';
import { Trend } from '../../../../schema/Dashboard';

const img = require('../../../../assets/trend.svg');
const error = require('../../../../assets/something-went-wrong.svg');

interface Props {
  trend?: Trend;
  isProcessing?: boolean;
}

export default ({ trend, isProcessing }: Props) => (
  <Card header={<Card.Header icon={<img src={img}/>} primary="Commits Trend"/>}>
    {
      isProcessing && (<Spinner type="donut" size="m" title="Loading..."/>)
    }
    {
      trend && (
          <LineChart
              width={350}
              height={200}
              data={trend.commits}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="received"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="submitted" stroke="#82ca9d" />
          </LineChart>
      )
    }
    {
      !isProcessing && !trend && (
        <PageState image={error} title="Service not available" description="Please try again later"/>
      )
    }
  </Card >
);