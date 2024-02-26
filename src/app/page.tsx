
"use client";

import React, { useEffect } from 'react'

export default function Page() {

  useEffect(() => {
    fetch('http://localhost:3000/api/home').then(res => res.json()).then(data => console.log(data))
  },[])
  return (
    <div>page1</div>
  )
}
