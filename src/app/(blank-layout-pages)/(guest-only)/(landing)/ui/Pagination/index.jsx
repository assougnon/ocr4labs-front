import Image from 'next/image';
import React from 'react';

export default function Pagination() {
  return (
    <ul className="cs_pagination_box">
      <li>
        <button className="cs_pagination_arrow cs_center">
          <Image src="/images/icons/left_arrow_blue.svg" alt="Icon"  height={11} width={16}/>
        </button>
      </li>
      <li>
        <button className="cs_pagination_item cs_center active">1</button>
      </li>
      <li>
        <button className="cs_pagination_item cs_center">2</button>
      </li>
      <li>
        <button className="cs_pagination_item cs_center">3</button>
      </li>
      <li>
        <span className="cs_pagination_item cs_center">...</span>
      </li>
      <li>
        <button className="cs_pagination_item cs_center">8</button>
      </li>
      <li>
        <button className="cs_pagination_arrow cs_center">
          <Image src="/images/icons/right_arrow_blue.svg" alt="Icon" height={11} width={16} />
        </button>
      </li>
    </ul>
  );
}
