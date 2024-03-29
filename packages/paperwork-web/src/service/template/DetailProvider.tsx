import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { TemplateDetail } from '../../schema/Template';
import { LOAD_TEMPLATE_DETAIL, CREATE_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE, LOAD_THUMBNAIL } from './intents';

export interface DetailProviderState {
  template?: TemplateDetail;
  load: () => Promise<TemplateDetail>;
  update: (template: TemplateDetail) => Promise<void>;
  create: (template: TemplateDetail) => Promise<void>;
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
  preLoad?: boolean;
  useThumbnail?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    template: undefined,
  };

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

  private loadThumbnail = async (template: TemplateDetail) => {
    const { integration } = this.props;
    const payload = await integration.send({
      intent: LOAD_THUMBNAIL,
      method: 'POST',
      content: {
        template,
      },
    });
    return payload.dataUri;
  }

  private update = async (template: TemplateDetail) => {
    const { templateId, userId, integration, useThumbnail } = this.props;
    const thumbnail = useThumbnail ? await this.loadThumbnail(template) : null;
    await integration.send({
      intent: UPDATE_TEMPLATE,
      method: 'PUT',
      urlParams: {
        userId,
        templateId,
      },
      content: {
        thumbnail,
        template,
      },
    });
    this.setState({
      template,
    });
  }

  private create = async (template: TemplateDetail) => {
    const { userId, integration, useThumbnail } = this.props;
    const thumbnail = useThumbnail ? await this.loadThumbnail(template) : null;
    await integration.send({
      intent: CREATE_TEMPLATE,
      method: 'POST',
      urlParams: {
        userId,
      },
      content: {
        thumbnail,
        template,
      },
    });
    this.setState({
      template,
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
    const { templateId, preLoad } = this.props;
    if (templateId !== 'new' && preLoad) {
      await this.load();
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { templateId, userId, preLoad } = this.props;
    const shouldLoad =
      (templateId !== prevProps.templateId || userId !== prevProps.userId)
      && templateId !== 'new';

    if (preLoad && shouldLoad) {
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
