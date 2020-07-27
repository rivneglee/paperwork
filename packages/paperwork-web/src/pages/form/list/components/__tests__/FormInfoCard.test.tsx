import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import FormInfoCard from '../FormInfoCard';

describe('FormInfoCard', () => {
  const onEdit = jest.fn();
  const onViewCommits = jest.fn();
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
        targetGap={10}
        maxGap={100}
        onEdit={onEdit}
        onViewCommits={onViewCommits}
        newCommitUrl="/foo"
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
        targetGap={10}
        maxGap={100}
        onEdit={onEdit}
        onViewCommits={onViewCommits}
        newCommitUrl="/foo"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should not render progress chart', () => {
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
        targetGap={0}
        maxGap={0}
        onEdit={onEdit}
        onViewCommits={onViewCommits}
        newCommitUrl="/foo"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
