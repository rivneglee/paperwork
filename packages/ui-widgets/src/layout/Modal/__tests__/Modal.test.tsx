import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Modal from '../Modal';
import Icons from '../../../graphic/Icons';

describe('Modal', () => {
  const Content = () => <>Content</>;

  it('should render modal when it not opened', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal
        header={<Modal.Header title="foo"/>}
        footer={<Modal.Footer>Footer</Modal.Footer>}
        isOpen={false}>
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render modal when it opened', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal
        isOpen={true}
        header={<Modal.Header title="foo"/>}
        footer={<Modal.Footer>Footer</Modal.Footer>}
      >
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render modal with header icon', () => {
    const wrapper: ShallowWrapper = shallow(
      <Modal
        isOpen={true}
        header={<Modal.Header title="foo" icon={<Icons.Confirm/>}/>}
        footer={<Modal.Footer>Footer</Modal.Footer>}
      >
        <Content />
      </Modal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
