import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Provider from '../Provider';

const mockIntegration = ({
  send: jest.fn(() => Promise.resolve('send')),
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

  describe('integration send', () => {
    let response: string;
    beforeAll((done) => {
      wrapper.find(Consumer).props().integration.send({
        intent: 'READ_SOMETHING',
        method: 'GET',
      }).then((payload: string) => {
        response = payload;
        done();
      });
    });

    it('should receive response', () => {
      expect(response).toBe('send');
    });

    it('should call mock integration method', () => {
      expect(mockIntegration.send).toBeCalledWith({
        intent: 'READ_SOMETHING',
        method: 'GET',
      }, {});
    });
  });
});
