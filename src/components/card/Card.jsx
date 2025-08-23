import { CCard, CCardHeader, CCardBody, CCardFooter } from '@coreui/react';
import React from 'react';
import Title from '../../views/base/title/Title';

const Card = ({
  title,
  subtitle,
  header,
  children,
  footer,
  noBodyPadding = false,
  bodyProps,
  footerProps,
  className,
  style,
  ...rest
}) => {
  return (
    <CCard className={`d-flex flex-column ${className || ''}`} style={style} {...rest}>
      {/* 헤더 */}
      {(header || title) && (
        <CCardHeader>{header ? header : <Title title={title} subtitle={subtitle} />}</CCardHeader>
      )}

      {/* 바디 */}
      {children &&
        (noBodyPadding ? (
          <div className="flex-fill d-flex flex-column">{children}</div>
        ) : (
          <CCardBody className="flex-fill d-flex flex-column" {...bodyProps}>
            {children}
          </CCardBody>
        ))}

      {/* 푸터 */}
      {footer && <CCardFooter {...footerProps}>{footer}</CCardFooter>}
    </CCard>
  );
};

export default Card;
