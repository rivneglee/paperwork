import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import AutoComplete from '../AutoComplete';

describe('AutoComplete', () => {
  let wrapper: ShallowWrapper;

  const colours = [
    { id: 'r', displayName: 'Red' },
    { id: 'g', displayName: 'Green' },
    { id: 'b', displayName: 'Blue' },
  ];

  const loadOptions = (inputValue: string): Promise<any[]> => (
    new Promise(resolve => (
        setTimeout(() =>
          resolve(colours.filter(
            c => c.displayName.indexOf(inputValue) !== -1)), 500)
      ),
    )
  );

  beforeAll(() => {
    wrapper = shallow(
      <AutoComplete
        loadOptions={loadOptions}
        value={{ id: 'r', displayName: 'Red' }}
        getOptionLabel={option => option.displayName}
        getOptionValue={option => option.id}
      />,
    );
  });

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
