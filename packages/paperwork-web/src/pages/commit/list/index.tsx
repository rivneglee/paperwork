import React from 'react';
import Page from './components/PageContainer';
import { GroupBy } from './components/CommitListPage';

export const UserCommitListPage = (props: any) => <Page groupBy={GroupBy.COMMITTER} {...props}/>;
export const FormCommitListPage = (props: any) => <Page groupBy={GroupBy.FORM} {...props}/>;
