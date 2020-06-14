import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { TemplateDetail } from '../../schema/Template';
import { LOAD_TEMPLATE_DETAIL, CREATE_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE } from './intents';

export interface DetailProviderState {
  template?: TemplateDetail;
  load: () => Promise<TemplateDetail>;
  update: (template: TemplateDetail, thumbnail: string) => Promise<void>;
  create: (template: TemplateDetail, thumbnail: string) => Promise<void>;
  remove: () => Promise<void>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  userId: string;
  templateId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    template: undefined,
  };

  private cleanValues = (template: TemplateDetail) => {
    const { items } = template;
    const newItems = Object.values(items).reduce((acc, current) => {
      const newItem = { ...current };
      delete newItem['value'];
      return {
        ...acc,
        [current.id]: newItem,
      };
    }, {});
    return {
      ...template,
      items: newItems,
    };
  }

  private load = async () => {
    const { templateId, userId } = this.props;
    const { integration } = this.props;
    const template = await integration.send({
      intent: LOAD_TEMPLATE_DETAIL,
      method: 'GET',
      urlParams: {
        userId,
        templateId,
      },
    });
    this.setState({
      template,
    });
    return template;
  }

  private update = async (template: TemplateDetail, thumbnail: string) => {
    const { templateId, userId } = this.props;
    const { integration } = this.props;
    const clearTemplate = this.cleanValues(template);
    await integration.send({
      intent: UPDATE_TEMPLATE,
      method: 'PUT',
      urlParams: {
        userId,
        templateId,
      },
      content: {
        thumbnail,
        template: clearTemplate,
      },
    });
    this.setState({
      template: clearTemplate,
    });
  }

  private create = async (template: TemplateDetail, thumbnail: string) => {
    const { userId } = this.props;
    const { integration } = this.props;
    const clearTemplate = this.cleanValues(template);
    await integration.send({
      intent: CREATE_TEMPLATE,
      method: 'POST',
      urlParams: {
        userId,
      },
      content: {
        thumbnail,
        template: clearTemplate,
      },
    });
    this.setState({
      template: clearTemplate,
    });
  }

  private remove = async () => {
    const { templateId, userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: DELETE_TEMPLATE,
      method: 'DELETE',
      urlParams: {
        userId,
        templateId,
      },
    });
  }

  async componentDidMount() {
    this.isInitializing = false;
    const { templateId } = this.props;
    if (templateId !== 'new') {
      await this.load();
    }
  }

  render() {
    const { template } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        template,
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
