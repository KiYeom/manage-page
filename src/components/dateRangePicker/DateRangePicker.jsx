// src/components/dateRangePicker/DateRangePicker.js

import React, { useState, useCallback } from 'react';
import { CDropdown, CDropdownToggle, CDropdownMenu, CButton } from '@coreui/react';
import { DayPicker } from 'react-day-picker';
import { getDateInfo, KOREA_TIME_OFFSET_MINUTES } from '../../utils/time';

const DateRangePicker = ({
  defaultTimeRange,
  onConfirm,
  isDateDisabled,
  isLoading,
  mode = 'range',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initialSelected =
    mode === 'single'
      ? new Date(defaultTimeRange[0])
      : { from: new Date(defaultTimeRange[0]), to: new Date(defaultTimeRange[1]) };

  const [selected, setSelected] = useState(initialSelected);

  // 날짜 선택 시 호출되는 콜백
  const handleDaySelect = useCallback(
    (value) => {
      setSelected(value);

      // mode가 'single'일 경우, 날짜 선택과 동시에 부모에게 알림
      if (mode === 'single' && value) {
        const resultDate = [getDateInfo(value, KOREA_TIME_OFFSET_MINUTES).dateString];
        onConfirm(resultDate);
        setDropdownOpen(false);
      }
    },
    [mode, onConfirm]
  );

  // '기간 선택 완료' 버튼 클릭 시
  const handleConfirm = useCallback(() => {
    if (selected && selected.from && selected.to) {
      const fromDate = getDateInfo(selected.from, KOREA_TIME_OFFSET_MINUTES).dateString;
      const toDate = getDateInfo(selected.to, KOREA_TIME_OFFSET_MINUTES).dateString;
      onConfirm([fromDate, toDate]);
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
          mode={mode}
          timeZone="Asia/Seoul"
          selected={selected}
          onSelect={handleDaySelect} // onSelect를 새로운 핸들러로 변경
          disabled={isDateDisabled}
        />
        {/* 'single' 모드일 때는 버튼을 숨김 */}
        {mode === 'range' && (
          <div className="d-grid gap-2">
            <CButton color="primary" onClick={handleConfirm}>
              기간 선택 완료
            </CButton>
          </div>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default DateRangePicker;
