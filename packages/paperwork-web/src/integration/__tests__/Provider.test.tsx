import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Provider from '../Provider';

const mockIntegration = ({
  read: jest.fn(() => Promise.resolve('read')),
  write: jest.fn(() => Promise.resolve('write')),
});

jest.mock('../createIntegration', () => jest.fn(() => (mockIntegration)));

describe('Provider', () => {
  const Consumer = (props: any) => <></>;
  const Spinner = () => <></>;

  const mappings = {};

  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider mappings={mappings} spinner={<Spinner />}>
        {
          integration => <Consumer integration={integration} />
        }
      </Provider>,
    );
  });

  describe('render', () => {
    it('should render consumer', () => {
      expect(wrapper.find(Consumer).length).toBe(1);
    });

    it('should pass down integration', () => {
      expect(wrapper.find(Consumer).props().integration).not.toBe(undefined);
    });

    it('should render spinner when processing', () => {
      wrapper.setState({
        isProcessing: true,
      });
      expect(wrapper.find(Spinner).length).toBe(1);
    });

    it('should not render spinner when processing done', () => {
      wrapper.setState({
        isProcessing: false,
      });
      expect(wrapper.find(Spinner).length).toBe(0);
    });
  });

  describe('integration read', () => {
    let response: string;
    beforeAll((done) => {
      wrapper.find(Consumer).props().integration.read({
        intent: 'READ_SOMETHING',
        method: 'GET',
      }).then((payload: string) => {
        response = payload;
        done();
      });
    });

    it('should receive response', () => {
      expect(response).toBe('read');
    });

    it('should call mock integration method', () => {
      expect(mockIntegration.read).toBeCalledWith({
        intent: 'READ_SOMETHING',
        method: 'GET',
      });
    });
  });

  describe('integration write', () => {
    let response: string;
    beforeAll((done) => {
      wrapper.find(Consumer).props().integration.write({
        intent: 'WRITE_SOMETHING',
        method: 'POST',
      }).then((payload: string) => {
        response = payload;
        done();
      });
    });

    it('should receive response', () => {
      expect(response).toBe('write');
    });

    it('should call mock integration method', () => {
      expect(mockIntegration.write).toBeCalledWith({
        intent: 'WRITE_SOMETHING',
        method: 'POST',
      });
    });
  });
});
