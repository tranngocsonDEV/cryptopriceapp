import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";
const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalcoinData, sethistoricalCoinData] = useState();

  const { currency } = useContext(CoinContext);
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-J78EwVrRuujycHTWg4niV7dW"
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchhistoricalcoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-J78EwVrRuujycHTWg4niV7dW"
      }
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, // Updated URL to use proxy
      options
    )
      .then((res) => res.json())
      .then((res) => sethistoricalCoinData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchhistoricalcoinData();
  }, [currency]);
  if (coinData && historicalcoinData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()}){" "}
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalcoinData={historicalcoinData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crrent Price</li>
            <li>
              {currency.symbol.toUpperCase()}{" "}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol.toUpperCase()}{" "}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24H Hour High</li>
            <li>
              {currency.symbol.toUpperCase()}{" "}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24H Hour Low</li>
            <li>
              {currency.symbol.toUpperCase()}{" "}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
