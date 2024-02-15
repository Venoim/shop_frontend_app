// AccountSettingsPage.js
import React, { useState } from "react";

const AccountSettingsPage = () => {
  // Stan dla ustawień konta
  const [settings, setSettings] = useState({
    changePassword: false,
    notifications: true,
  });

  // Funkcje obsługujące zmianę ustawień konta

  return (
    <div className="box">
      <h2 className="title is-4">Ustawienia konta</h2>
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
        <label htmlFor="changePassword">Zmień hasło</label>
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
        <label htmlFor="notifications">Otrzymuj powiadomienia</label>
      </div>
      {/* Dodaj więcej opcji ustawień konta */}
    </div>
  );
};

export default AccountSettingsPage;
