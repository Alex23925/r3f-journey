import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Scene from '../components/Scene'
import CanvasLayout from '../components/CanvasLayout'
import '../styles/home.scss'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Layout 
      lessonName='First Lesson' 
      lessonNum={0}
      chNum={1}
      >
        <CanvasLayout>
          <Scene />
        </CanvasLayout>
      </Layout>
    </> 
  )
}
