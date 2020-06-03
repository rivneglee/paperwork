import React from 'react';

import { Form, Input, Select, FormMode } from '../../../src';
import { layout, items } from '../fixtures/data';

const itemComponentMap = {
  input: { MainView: Input },
  select: { MainView: Select },
};

export default () => {
  return (
    <div>
      <Form
        theme="pink"
        mode={FormMode.DESIGN}
        name="pink"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="red"
        mode={FormMode.DESIGN}
        name="red"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="purple"
        mode={FormMode.DESIGN}
        name="purple"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="indigo"
        mode={FormMode.DESIGN}
        name="indigo"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="blue"
        mode={FormMode.DESIGN}
        name="blue"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="blue-grey"
        mode={FormMode.DESIGN}
        name="blue-grey"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="cyan"
        mode={FormMode.DESIGN}
        name="cyan"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="teal"
        mode={FormMode.DESIGN}
        name="teal"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="green"
        mode={FormMode.DESIGN}
        name="green"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="light-green"
        mode={FormMode.DESIGN}
        name="light-green"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="lime"
        mode={FormMode.DESIGN}
        name="lime"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="yellow"
        mode={FormMode.DESIGN}
        name="yellow"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="amber"
        mode={FormMode.DESIGN}
        name="amber"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="orange"
        mode={FormMode.DESIGN}
        name="orange"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="deep-orange"
        mode={FormMode.DESIGN}
        name="deep-orange"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
      <Form
        theme="brown"
        mode={FormMode.DESIGN}
        name="brown"
        layout={layout}
        items={items}
        itemComponentMap={itemComponentMap}
        onDragEnd={() => {
        }}
      />
    </div>
  );
};
