import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Icons } from '@paperwork/ui-widgets';
import './QRCode.scss';

interface Props {
  url: string;
  className?: string;
}

export default ({ url, className }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className={classNames('pwapp-qrcode', className)}>
      <div className="pwapp-qrcode__inner">
        <QRCode value={url}/>
      </div>
      <div className="pwapp-qrcode__buttons">
        <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
          <Button
            className="pwapp-qrcode__button"
            type="link"
            icon={<Icons.Link/>}
          >Copy link</Button>
        </CopyToClipboard>
        {
          isCopied && <Icons.Pass className="pwapp-qrcode__copied"/>
        }
      </div>
    </div>
  );
};
