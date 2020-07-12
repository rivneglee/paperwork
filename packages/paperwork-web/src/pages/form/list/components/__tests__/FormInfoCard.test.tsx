import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import FormInfoCard from '../FormInfoCard';

describe('FormInfoCard', () => {
  it('should render public badge', () => {
    const wrapper: ShallowWrapper = shallow(
      <FormInfoCard
        id="1"
        name="Form"
        status="open"
        isPublic={true}
        createdAt="30/06/2020"
        closeDate="--"
        targetCommits="--"
        maxCommits="--"
        receivedCommits={10}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should not render public badge', () => {
    const wrapper: ShallowWrapper = shallow(
      <FormInfoCard
        id="1"
        name="Form"
        status="open"
        isPublic={false}
        createdAt="30/06/2020"
        closeDate="--"
        targetCommits="--"
        maxCommits="--"
        receivedCommits={10}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
