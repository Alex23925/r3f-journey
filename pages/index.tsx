import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Scene from '../components/Scene'
import CanvasLayout from '../components/CanvasLayout'
import '../styles/home.scss'
import Layout from '../components/Layout'
import * as THREE from 'three'

export default function Home() {
  return (
    <>
      <Layout 
      lessonName='First Lesson' 
      lessonLink={'/'}
      lessonNum={0}
      chNum={1}
      >
        <CanvasLayout cameraPosition={new THREE.Vector3(0, 0, 3)}>
          <Scene />
        </CanvasLayout>
      </Layout>
    </> 
  )
}
