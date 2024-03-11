import React, { useState, useEffect } from "react";
import { User, DataPageProps } from "../../../types";
import { ToastContainer, toast } from "react-toastify";

const DataPage: React.FC<DataPageProps> = ({ userData }) => {
  const [fetchedUserData, setFetchedUserData] = useState<User | null>(null);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userDataFromStorage = localStorage.getItem("userData");
    if (userDataFromStorage) {
      const parsedData = JSON.parse(userDataFromStorage);
      setFetchedUserData(parsedData.userData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (fetchedUserData) {
      setFetchedUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            [name]: value,
          };
        }
        return null;
      });
      setIsDataChanged(true);
    }
  };
  const handleSave = async () => {
    if (!isDataChanged || !fetchedUserData) {
      toast.info("Brak zmian do zapisania.");
      return;
    }
    try {
      toast.success("Dane użytkownika zostały zaktualizowane.");
      const response = await fetch(
        `http://localhost:3001/api/users/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchedUserData),
        }
      );

      if (response.ok) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ userData: fetchedUserData })
        );
        setIsDataChanged(false);
      } else {
        toast.error("Wystąpił błąd podczas aktualizacji danych użytkownika.");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="box">
      <ToastContainer position="bottom-right" />
      {fetchedUserData && (
        <>
          <h2 className="title is-4">Your data</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={fetchedUserData.name || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Last name:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="surname"
                  value={fetchedUserData.surname || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Address:</label>
              <input
                className="input"
                type="text"
                name="address"
                value={fetchedUserData.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label className="label">Phone number:</label>
              <input
                className="input"
                type="tel"
                name="phoneNumber"
                value={fetchedUserData.phoneNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <button className="button is-primary" type="submit">
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default DataPage;
