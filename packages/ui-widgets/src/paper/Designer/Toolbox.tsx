import React, { FunctionComponent } from 'react';
import Accordion from '../../layout/Accordion/Accordion';
import AccordionPanel from '../../layout/Accordion/AccordionPanel';

interface Props {}

const Toolbox: FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="pw-form-toolbox">
    <Accordion>
      <AccordionPanel header="Layouts">
      </AccordionPanel>
      <AccordionPanel header="Items">
      </AccordionPanel>
    </Accordion>
    </div>
  );
};

export default Toolbox;
