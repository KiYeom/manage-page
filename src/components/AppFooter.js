import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <CFooter className="px-4 d-flex flex-wrap justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <a
          href="https://remind4u.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="fw-semibold text-decoration-none"
        >
          reMIND
        </a>
        <small className="ms-2 text-muted">
          &copy; <time dateTime={currentYear}>{currentYear}</time> All rights reserved.
        </small>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
