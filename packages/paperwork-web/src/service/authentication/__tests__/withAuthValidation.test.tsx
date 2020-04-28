import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import withAuthValidation from '../withAuthValidation';
import SignInPage from '../../../pages/signIn';
import authentication from '../mappings/data/authentication.json';

describe('withAuthValidation', () => {
  let wrapper: ShallowWrapper;
  const targetProps = { name: 'foo' };
  const Page = (props: any) => <div {...props}>Page</div>;

  describe('when have not authenticated', () => {
    beforeAll(() => {
      const storage = {
        get: jest.fn(() => null),
        set: jest.fn(),
      };
      const DecoratedPage = withAuthValidation(Page, storage);
      wrapper = shallow(<DecoratedPage {...targetProps} />);
    });

    it('should render login page', () => {
      expect(wrapper.find(SignInPage).length).toBe(1);
    });

    it('should not render target page', () => {
      expect(wrapper.find(Page).length).toBe(0);
    });
  });

  describe('when have authenticated', () => {
    beforeAll(() => {
      const storage = {
        get: jest.fn(() => authentication),
        set: jest.fn(),
      };
      const DecoratedPage = withAuthValidation(Page, storage);
      wrapper = shallow(<DecoratedPage {...targetProps} />);
    });

    it('should not render login page', () => {
      expect(wrapper.find(SignInPage).length).toBe(0);
    });

    it('should not render target page', () => {
      expect(wrapper.find(Page).length).toBe(1);
    });

    it('target page should receive correct props', () => {
      expect(wrapper.find(Page).props()).toEqual(targetProps);
    });
  });
});
