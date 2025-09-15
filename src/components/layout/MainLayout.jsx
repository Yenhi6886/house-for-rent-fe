import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
