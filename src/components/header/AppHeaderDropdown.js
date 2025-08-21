import React from 'react';
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteAccessToken, deleteRefreshToken } from '../../storages/storages';

import avatar10 from './../../assets/images/avatars/10.jpg';

const navigateToHome = () => [(window.location.href = '/')];

const AppHeaderDropdown = () => {
  const handleLogout = () => {
    deleteAccessToken();
    deleteRefreshToken();
    //console.log('로그아웃')
    navigateToHome();
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar10} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          로그아옷!!
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
