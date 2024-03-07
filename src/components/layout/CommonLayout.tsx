import React, { ReactNode } from "react";

interface CommonLayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const CommonLayout = ({ header, footer, children }: CommonLayoutProps) => {
  return (
    <div className="common-layout">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default CommonLayout;
