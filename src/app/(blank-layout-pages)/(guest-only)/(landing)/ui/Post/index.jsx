import { Icon } from '@iconify/react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Post({
  title,
  thumbUrl,
  date,
  btnText,
  href,
  socialShare,
  variant,
}) {
  return (
    <div className={`cs_post cs_style_1 ${variant}`}>
      <Link href={href} className="cs_post_thumb cs_view_mouse">
        <Image src={thumbUrl} alt={title} height={379} width={526}/>
      </Link>
      <div className="cs_post_info">
        <div>
          <div className="cs_post_meta">
            <div className="cs_posted_by">{date}</div>
            {socialShare && (
              <div className="cs_post_social">
                <Link href="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:linkedin-in" />
                </Link>
                <Link href="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:facebook-f" />
                </Link>
                <Link href="/" className="cs_center rounded-circle">
                  <Icon icon="fa-brands:twitter" />
                </Link>
              </div>
            )}
          </div>
          <h2 className="cs_post_title cs_semibold cs_fs_32">
            <Link href={href}>{title}</Link>
          </h2>
        </div>
        {btnText && (
          <div className="cs_heading_color cs_medium">
            <Link href={href} className="cs_post_btn">
              {btnText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
