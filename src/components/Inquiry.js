// import React, { useEffect } from "react";
import axios from "axios";

function Inquiry() {
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);
}

export default Inquiry;
