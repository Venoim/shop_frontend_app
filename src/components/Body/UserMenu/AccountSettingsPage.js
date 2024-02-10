import React, { useState } from "react";

const AccountSettingsPage = () => {
  // Stan dla ustawień konta
  const [settings, setSettings] = useState({
    changePassword: false, // Flaga informująca, czy użytkownik chce zmienić hasło
    notifications: true, // Flaga informująca, czy użytkownik chce otrzymywać powiadomienia
    // Dodaj więcej ustawień według potrzeb
  });

  // Funkcje obsługujące zmianę ustawień konta

  return (
    <div>
      <h2>Ustawienia konta</h2>
      <label>
        <input
          type="checkbox"
          name="changePassword"
          checked={settings.changePassword}
          onChange={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              changePassword: !prevSettings.changePassword,
            }))
          }
        />
        Zmień hasło
      </label>
      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              notifications: !prevSettings.notifications,
            }))
          }
        />
        Otrzymuj powiadomienia
      </label>
      {/* Dodaj więcej opcji ustawień konta */}
    </div>
  );
};

export default AccountSettingsPage;
