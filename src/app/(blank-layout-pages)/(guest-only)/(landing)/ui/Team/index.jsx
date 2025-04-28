import { Icon } from '@iconify/react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Team({
  imgUrl,
  name,
  designation,
  description,
  social,
}) {
  return (
    <div className="cs_team cs_style_1 text-center cs_radius_20 cs_type_1">
      <div className="cs_member_img">
        <Image src={imgUrl} alt={name} height={231} width={231} />
      </div>
      <div className="cs_team_meta">
        <div>
          <h3 className="cs_member_name cs_semibold cs_fs_40">{name}</h3>
          <p className="cs_member_designation cs_fs_20 cs_heading_color">
            {designation}
          </p>
          <p className="cs_member_description">{description}</p>
        </div>
        <div>
          <div className="cs_social_links">
            {social?.map((item, index) => (
              <Link href={item.href} key={index}>
                <Icon icon={item.icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
