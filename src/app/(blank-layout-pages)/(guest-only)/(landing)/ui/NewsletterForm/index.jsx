import Image from 'next/image';
import React from 'react';

export default function NewsletterForm({ label, btnText, btnArrowUrl }) {
  return (
    <>
      {label && <p>Your Email</p>}
      <form action="#" className="cs_newsletter_form">
        <input
          type="text"
          className="cs_form_field"
          placeholder="example@email.com"
        />
        <button className="cs_btn cs_style_1">
          <span>{btnText}</span>
          <i>
            <Image src={btnArrowUrl} alt="Icon" height={11} width={15} />
            <Image src={btnArrowUrl} alt="Icon" height={11} width={15} />
          </i>
        </button>
      </form>
    </>
  );
}
