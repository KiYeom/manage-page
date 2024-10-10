import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import CTAButton from '../views/buttons/cta-button'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <CTAButton />
    </div>
  )
}

export default DefaultLayout
