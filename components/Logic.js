import { useState } from "react";

export const getCollections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `http://127.0.0.1:3001/collections?date=${currentDate}`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCollections(response.data);
        console.log("collections", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Calculating each disbursment
  const calcDisbursements = () => {
    let totalDisbursements = 0;
    // Divide each collection by the rate
    collections.forEach((item) => {
      const disbursement = parseFloat(item.amount) / parseFloat(rateValue);
      totalDisbursements += disbursement;
    });

    return totalDisbursements;
  };

  const calcClosingBalance = () => {
    let totalCollections = calcUsdToAed();
    console.log(totalCollections);
    let totalDisbursements = calcDisbursements();

    console.log(totalDisbursements);
    return parseFloat(totalCollections - totalDisbursements)?.toFixed(2);
  };


};
