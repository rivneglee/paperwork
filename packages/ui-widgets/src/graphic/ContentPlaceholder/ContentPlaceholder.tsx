import React, { FunctionComponent } from 'react';
import ContentLoader from 'react-content-loader';

interface Props {}

const ContentPlaceholder: FunctionComponent<Props> = () => (
  <ContentLoader viewBox="0 0 176 124"/>
);

export default ContentPlaceholder;
