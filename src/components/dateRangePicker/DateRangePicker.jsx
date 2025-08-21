import React, { useState, useCallback } from 'react';
import { CDropdown, CDropdownToggle, CDropdownMenu, CButton } from '@coreui/react';
import { DayPicker } from 'react-day-picker';
import { getDateInfo, KOREA_TIME_OFFSET_MINUTES } from '../../utils/time';

const DateRangePicker = ({ defaultTimeRange, onConfirm, isDateDisabled, isLoading }) => {
  // 1. 자체적인 UI 상태 관리 (드롭다운 열림/닫힘, 현재 선택 중인 날짜)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState({
    from: new Date(defaultTimeRange[0]),
    to: new Date(defaultTimeRange[1]),
  });

  // 2. 날짜 선택이 '완료'되었을 때만 부모에게 알림
  const handleDateSelectionConfirm = useCallback(() => {
    if (selected && selected.from && selected.to) {
      const fromDate = getDateInfo(selected.from, KOREA_TIME_OFFSET_MINUTES).dateString;
      const toDate = getDateInfo(selected.to, KOREA_TIME_OFFSET_MINUTES).dateString;
      onConfirm([fromDate, toDate]); // 부모에게 최종 결과만 전달
    }
    setDropdownOpen(false);
  }, [selected, onConfirm]);

  return (
    <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
      <CDropdownToggle
        color="primary"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        disabled={isLoading}
      >
        날짜 선택
      </CDropdownToggle>
      <CDropdownMenu style={{ padding: '10px' }}>
        <DayPicker
          captionLayout="dropdown"
          mode="range"
          timeZone="Asia/Seoul"
          selected={selected}
          onSelect={setSelected}
          disabled={isDateDisabled}
        />
        <div className="d-grid gap-2">
          <CButton color="primary" onClick={handleDateSelectionConfirm}>
            날짜 선택 완료
          </CButton>
        </div>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default DateRangePicker;
