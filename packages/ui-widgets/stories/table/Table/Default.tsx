import React from 'react';

import { Table } from '../../../src';

export default () => (
  <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
   <Table>
     <Table.Header>
       <Table.HeaderItem>Name</Table.HeaderItem>
       <Table.HeaderItem>Job title</Table.HeaderItem>
       <Table.HeaderItem>Team</Table.HeaderItem>
       <Table.HeaderItem>On boarding date</Table.HeaderItem>
       <Table.HeaderItem>Status</Table.HeaderItem>
     </Table.Header>
     <Table.Body>
       <Table.Row>
         <Table.RowItem columnName="Name">CHENG LI</Table.RowItem>
         <Table.RowItem columnName="Job title">Senior Developer</Table.RowItem>
         <Table.RowItem columnName="Team">Customer Service</Table.RowItem>
         <Table.RowItem columnName="On boarding date">01/02/2020</Table.RowItem>
         <Table.RowItem columnName="Status">Active</Table.RowItem>
       </Table.Row>
       <Table.Row>
         <Table.RowItem columnName="Name">BOB NICK</Table.RowItem>
         <Table.RowItem columnName="Job title">Senior Developer</Table.RowItem>
         <Table.RowItem columnName="Team">Financial Service</Table.RowItem>
         <Table.RowItem columnName="On boarding date">01/02/2009</Table.RowItem>
         <Table.RowItem columnName="Status">Active</Table.RowItem>
       </Table.Row>
     </Table.Body>
   </Table>
  </div>
);
