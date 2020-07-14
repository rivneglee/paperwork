import React, { FunctionComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import './ProgressChart.scss';

interface Props {
  maxGap: number;
  targetGap: number;
  receivedCommits: number;
  progress?: string;
}

const COLORS = ['#00AA65', '#865FDF', '#A476C1'];

const ProgressChart: FunctionComponent<Props> = ({
   maxGap,
   targetGap,
   receivedCommits,
   progress,
}) => {
  const data = [
    { name: 'receivedCommits', value: receivedCommits },
    { name: 'targetGap', value: targetGap },
    { name: 'maxGap', value: maxGap },
  ];
  return (
    <PieChart className="pwapp-form-progress" width={140} height={140}>
      <Pie
        isAnimationActive
        data={data}
        cx="50%"
        cy="60%"
        labelLine={false}
        outerRadius={50}
        innerRadius={30}
        fill="#8884d8"
        dataKey="value"
      >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      {
        progress && <text className="pwapp-form-progress__rate" x="50%" y="58%" dy={8} textAnchor="middle">{progress}</text>
      }
    </PieChart>
  );
};

export default ProgressChart;
