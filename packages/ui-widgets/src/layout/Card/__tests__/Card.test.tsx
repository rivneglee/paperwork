import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Card from '../Card';

describe('Card', () => {
  const Header = () => <>'Header'</>;
  const Footer = () => <>'Footer'</>;
  const Content = () => <>'Content'</>;

  it('should render with header and footer', () => {
    const wrapper: ShallowWrapper = shallow(
      <Card header={<Header />} footer={<Footer />}>
        <Content />
      </Card>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render without header and footer', () => {
    const wrapper: ShallowWrapper = shallow(
      <Card>
        <Content />
      </Card>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
