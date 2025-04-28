import { Icon } from '@iconify/react';
import React from 'react';

export default function ContactInfoWidget() {
  return (
    <ul className="cs_contact_widget">
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        73 Rue de Vaugirard, 75006 Paris FRANCE
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        +33 1 88 80 26 96
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        contact@ocr4labs.com
      </li>
    </ul>
  );
}
