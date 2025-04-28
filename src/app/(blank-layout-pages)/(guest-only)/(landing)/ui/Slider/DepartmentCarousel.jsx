"use client"
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';

export default function DepartmentCarousel({ data }) {
  /** Slider Settings **/
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'cs_slider_prev cs_center' +
        (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Image src="/images/icons/left_arrow_blue.svg" alt="Icon" height={24} width={35} />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'cs_slider_next cs_center' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Image src="/images/icons/right_arrow_blue.svg" alt="Icon" height={24} width={35} />
    </div>
  );
  const settings = {
    dots: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 6,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider
        {...settings}
        className="cs_gap_20 cs_cs_slider_navigation_1 cs_department_carousel"
      >
        {data?.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className="cs_department cs_shadow_1 cs_radius_20 cs_white_bg"
            >
              <>
                <Image src={item.iconUrl} alt="Icon" height={75} width={75}/>
                <p className="cs_department_title cs_medium cs_heading_color cs_fs_20 mb-0">
                  {item.title}
                </p>
              </>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
