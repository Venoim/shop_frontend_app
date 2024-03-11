// AccountSettingsPage.js
import React, { useState } from "react";

const AccountSettingsPage = () => {
  // Status for account settings
  const [settings, setSettings] = useState({
    changePassword: false,
    notifications: true,
  });

  // Functions that support changing account settings

  return (
    <div className="box">
      <h2 className="title is-4">Account settings</h2>
      <div className="field">
        <input
          id="changePassword"
          type="checkbox"
          className="switch is-rounded is-info"
          checked={settings.changePassword}
          onChange={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              changePassword: !prevSettings.changePassword,
            }))
          }
        />
        <label htmlFor="changePassword">Change Password</label>
      </div>
      <div className="field">
        <input
          id="notifications"
          type="checkbox"
          className="switch is-rounded is-info"
          checked={settings.notifications}
          onChange={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              notifications: !prevSettings.notifications,
            }))
          }
        />
        <label htmlFor="notifications">Receive notifications</label>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
