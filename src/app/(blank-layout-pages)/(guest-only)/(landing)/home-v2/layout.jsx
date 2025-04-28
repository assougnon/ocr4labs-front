"use client"
import React from 'react'

import Header from '../ui/Header'
import Footer from '../ui/Footer'

import '../sass/index.scss'
// eslint-disable-next-line import/order




export default function Layout({ children }) {
  return (
    <>
      <Header logoSrc="/images/ocr4labs-blanc.png" variant="cs_white_color" />
      <main>{children}</main>
      <Footer />
    </>
  )
}
