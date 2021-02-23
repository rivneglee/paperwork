import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Provider from '../AuthenticationProvider';
// import { AUTHENTICATE } from '../intents';
import authentication from '../mappings/data/authentication.json';
import { Integration } from '../../../integration';

describe('AuthenticationProvider', () => {
  const Consumer = ({ authenticate }: any) => {
    authenticate('u', 'p');
    return <></>;
  };

  let wrapper: ReactWrapper;
  let mockIntegration: Integration;
  beforeEach(() => {
    mockIntegration = ({
      send: jest.fn(() => Promise.resolve(authentication)),
    });
  });

  describe('when have no authentication', () => {
    const storage = {
      get: jest.fn(() => undefined),
      set: jest.fn(),
      clear: jest.fn(),
    };

    beforeEach(() => {
      wrapper = mount((
        <Provider integration={mockIntegration} isProcessing={true} storage={storage}>
          {
            ({ authenticate }) => (
              <Consumer authenticate={authenticate}/>
            )
          }
        </Provider>
      ));
    });

    it('consumer component should render', () => {
      expect(wrapper.find(Consumer).length).toBe(1);
    });
    /*
    it('integration method should be called', () => {
      expect(mockIntegration.send).toBeCalledWith({
        intent: AUTHENTICATE,
        params: {
          username: 'u',
          password: 'p',
        },
        method: 'GET',
      });
    });
    */
    it('storage setter method should be called', () => {
      expect(storage.set).toBeCalledWith(authentication);
    });
  });

  describe('when have authentication', () => {
    const storage = {
      get: jest.fn(() => authentication),
      set: jest.fn(),
      clear: jest.fn(),
    };

    beforeEach(() => {
      wrapper = mount((
        <Provider integration={mockIntegration} isProcessing={true} storage={storage}>
          {
            ({ authenticate }) => (
              <Consumer authenticate={authenticate}/>
            )
          }
        </Provider>
      ));
    });

    it('consumer component should not render', () => {
      expect(wrapper.find(Consumer).length).toBe(0);
    });

    it('integration method should not be called', () => {
      expect(mockIntegration.send).not.toBeCalled();
    });

    it('storage setter method should not be called', () => {
      expect(storage.set).not.toBeCalled();
    });
  });
});
