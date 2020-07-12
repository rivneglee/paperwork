import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { FormDetail } from '../../schema/Form';
import { LOAD_FORM_DETAIL, CREATE_FORM, UPDATE_FORM, DELETE_FORM } from './intents';

export interface DetailProviderState {
  form?: FormDetail;
  load: () => Promise<FormDetail>;
  update: (form: FormDetail) => Promise<void>;
  create: (form: FormDetail) => Promise<void>;
  remove: () => Promise<void>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  userId: string;
  formId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    form: undefined,
  };

  private load = async () => {
    const { formId, userId } = this.props;
    const { integration } = this.props;
    const form = await integration.send({
      intent: LOAD_FORM_DETAIL,
      method: 'GET',
      urlParams: {
        userId,
        formId,
      },
    });
    this.setState({
      form,
    });
    return form;
  }

  private update = async (form: FormDetail) => {
    const { formId, userId, integration } = this.props;
    await integration.send({
      intent: UPDATE_FORM,
      method: 'PUT',
      urlParams: {
        userId,
        formId,
      },
      content: form,
    });
    this.setState({
      form,
    });
  }

  private create = async (form: FormDetail) => {
    const { userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: CREATE_FORM,
      method: 'POST',
      urlParams: {
        userId,
      },
      content: form,
    });
    this.setState({
      form,
    });
  }

  private remove = async () => {
    const { formId, userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: DELETE_FORM,
      method: 'DELETE',
      urlParams: {
        userId,
        formId,
      },
    });
  }

  async componentDidMount() {
    this.isInitializing = false;
    const { formId, preLoad } = this.props;
    if (formId !== 'new' && preLoad) {
      await this.load();
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { formId, userId, preLoad } = this.props;
    const shouldLoad =
      (formId !== prevProps.formId || userId !== prevProps.userId)
      && formId !== 'new';

    if (preLoad && shouldLoad) {
      await this.load();
    }
  }

  render() {
    const { form } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        form,
        isProcessing,
        load: this.load,
        update: this.update,
        create: this.create,
        remove: this.remove,
        isInitializing: this.isInitializing,
      })
    );
  }
}
