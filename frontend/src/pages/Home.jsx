import React from 'react'
import { Hero } from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 text-slate-900 px-6 md:px-10 py-8 space-y-20">
      <Hero />

      {/* Section Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />

      <RecentlyAdded />
    </div>
  )
}

export default Home
