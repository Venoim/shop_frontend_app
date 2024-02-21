import React from "react";

const CommonLayout = ({ header, footer, children }) => {
  return (
    <div className="common-layout">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default CommonLayout;
