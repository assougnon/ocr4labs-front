"use client"
import React from 'react';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import SocialWidget from '../Widget/SocialWidget';
import Newsletter from '../Widget/Newsletter';
import TextWidget from '../Widget/TextWidget';
import Image from 'next/image';
const menuDataOne = [
  { title: 'About Us', href: '/about' },
  { title: 'Departments', href: '/departments' },
  { title: 'Doctors', href: '/doctors' },
  { title: 'Timetable', href: '/timetable' },
  { title: 'Appointment', href: '/appointments' },
  { title: 'Se connecter', href: '/login' },
];
const menuDataTwo = [
  { title: 'Blog', href: '/blog' },
  { title: 'Contact Us', href: '/contact' },
  { title: 'FAQs', href: '/' },
  { title: 'Privacy Policy', href: '/' },
  { title: 'Terms and Conditions', href: '/' },
];

export default function Footer() {
  return (
    <footer className="cs_footer cs_style_1 cs_white_color">
      <div
        className="cs_footer_logo_wrap"
        style={{ backgroundImage: 'url(/images/footer_bg_1.svg)' }}
      >
        <div
          className="cs_footer_brand"
          style={{ backgroundImage: 'url(/images/footer_logo_bg.svg)' }}
        >
          <Image
            src="/images/icone_ocr4labs.svg"
            alt="Logo Icon"
            className="cs_footer_brand_icon"
            height={49}
            width={51}
          />
          <h2 className="cs_footer_brand_text">Ocr4Labs</h2>
        </div>
      </div>
      <div className="cs_footer_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <TextWidget text="Ocr4LabsLa santé éclairée <br />par la technologie" />
                <ContactInfoWidget />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataOne} />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="cs_footer_item">
                <MenuWidget data={menuDataTwo} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cs_footer_item">
                <Newsletter
                  title="Abonnez vous à notre newsletter"
                  subTitle="Pour obtenir les dernières nouvelles sur la Tech Médicale"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom cs_accent_bg">
        <div className="container">
          <div className="cs_footer_bottom_in">
            <SocialWidget />
            <div className="cs_copyright">
              Copyright © 2025 Ocr4Labs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
