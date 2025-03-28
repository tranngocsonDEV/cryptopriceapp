import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (!e.target.value) {
      setDisplayCoins(allCoins);
    }
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoins(coins);
  };
  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          The global cryptocurrency market cap today is $2.78 Trillion, a 2.4%
          change in the last 24 hours.
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search Crypto..."
            required
          />
          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoins.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div >
              <img src={item.image} alt={item.name} />
              <p>
                {item.name}{" "}
                <span className="symbol">{item.symbol.toUpperCase()}</span>
              </p>
            </div>
            <p>
              {currency.symbol}
              {item.current_price.toLocaleString()}{" "}
              {/* Formats the current price according to the user's locale */}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0 ? "positive" : "negative"
              }
            >
              {item.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
