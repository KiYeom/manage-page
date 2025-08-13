import React from 'react'
import { CButton, CDropdown, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import { DayPicker } from 'react-day-picker'

const DateRangePicker = ({
  selected,
  onSelect,
  disabled,
  onConfirm,
  dropdownOpen,
  setDropdownOpen,
  loading,
  isMobile = false,
}) => {
  const dropdownStyle = isMobile
    ? { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : { display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }

  const menuStyle = isMobile ? { padding: '10px', width: '100%' } : { padding: '10px' }

  return (
    <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
      <CDropdownToggle
        color="primary"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        disabled={loading}
        style={dropdownStyle}
      >
        날짜 선택
      </CDropdownToggle>
      <CDropdownMenu style={menuStyle}>
        <DayPicker
          captionLayout="dropdown"
          mode="range"
          timeZone="Asia/Seoul"
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
        />
        <div className="d-grid gap-2">
          <CButton color="primary" onClick={onConfirm}>
            날짜 선택 완료
          </CButton>
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default DateRangePicker
