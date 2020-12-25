import React, { FunctionComponent } from 'react';
import { Button, ButtonRow, Modal, Scrollable } from '@paperwork/ui-widgets';
import OrganisationSelector from './OrganisationSelector';
import './OrganisationModal.scss';

interface Props {
  organisation: any;
  onSelect?: (selections: string[]) => void;
  title?: string;
  subTitle?: string;
}

export type OrganisationModalComponent = FunctionComponent<Props>;

const OrganisationModal: OrganisationModalComponent  = ({
  organisation,
  onSelect,
  title = 'Select organisations',
  subTitle = 'Share this resource to following organisations',
}) => {
  return (
    <Modal
      isOpen={true}
      header={
        <Modal.Header
          title={title}
          subTitle={subTitle}
        />
      }
      footer={
        <Modal.Footer>
          <ButtonRow primary={[
            <Button key="save" color="secondary" size="s">SAVE</Button>,
            <Button key="cancel" color="secondary" size="s">CANCEL</Button>,
          ]}/>
        </Modal.Footer>
      }
    >
      <Scrollable className="pwapp-organisation-dialog">
        <OrganisationSelector organisation={organisation} onSelect={onSelect}/>
      </Scrollable>
    </Modal>
  );
};

export default OrganisationModal;
