import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Modal from '../Modal';
import { Button } from '../../../form/Button';

describe('Modal', () => {
  const Content = () => <>Content</>;

  it('should render modal when it not opened', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal title="Foo" isOpen={false}>
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render modal when it opened', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal title="Foo" isOpen={true}>
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render modal with buttons', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal title="Foo" isOpen={true} buttons={[
        <Button>OK</Button>,
      ]}>
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
