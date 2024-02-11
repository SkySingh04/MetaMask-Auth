'use client'
import React from 'react'
import withAuth from "@/Utils/withAuth";

const page = () => {
  return (
    <div>This is a protected Route. Congratulations!</div>
  )
}

export default withAuth(page)