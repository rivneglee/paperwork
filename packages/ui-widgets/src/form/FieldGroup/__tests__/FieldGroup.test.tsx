import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import FieldGroup from '../FieldGroup';

describe('FieldGroup', () => {
  const Label = () => <>Label</>;
  const Input = () => <>Input</>;

  it('should render field group with label', () => {
    const wrapper: ShallowWrapper = shallow(
      <FieldGroup label={<Label />}>
        <Input />
      </FieldGroup>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render field group without label', () => {
    const wrapper: ShallowWrapper = shallow(
      <FieldGroup>
        <Input />
      </FieldGroup>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
