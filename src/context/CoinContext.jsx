import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });
  const fectchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-J78EwVrRuujycHTWg4niV7dW"
      }
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fectchAllCoin();
  }, [currency]);
  const ContextValue = { allCoins, currency, setCurrency };
  return (
    <CoinContext.Provider value={ContextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
