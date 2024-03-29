import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ConversionsCard({ data }) {
  const [ascending, setAscending] = useState(true);

  const currencies = data.bpi;
  const identifiers = Object.keys(currencies).sort((a, b) =>
    ascending
      ? currencies[a].rate_float - currencies[b].rate_float
      : currencies[b].rate_float - currencies[a].rate_float
  );
  const [selectedCurrency, setSelectedCurrency] = useState(identifiers[0]);

  const [btcAmount, setBtcAmount] = useState(1);
  const { code, description, rate_float } = currencies[selectedCurrency];
  const [currencyAmount, setCurrencyAmount] = useState(
    +(btcAmount * rate_float).toFixed(2)
  );

  return (
    <div
      className="card"
      style={{
        borderRadius: '1em'
      }}
    >
      {identifiers.map((identifier, index) => {
        const current = currencies[identifier];
        return (
          <p
            key={index}
            style={{
              fontWeight: 'bold'
            }}
          >
            #{index + 1} - {current.description} ={' '}
            {currencies[identifier].rate_float.toFixed(2)} {identifier}
          </p>
        );
      })}

      <button
        className={'nav-item btn btn-dark mb-5'}
        onClick={() => setAscending(!ascending)}
      >
        Sort By {ascending ? 'Descending' : 'Ascending'} Rate
      </button>

      <p>
        Select a currency to convert from BTC to that currency from the dropdown
        below.
      </p>

      <div className="input-group mb-3">
        <select
          className="form-control"
          value={selectedCurrency}
          onChange={(e) => {
            setSelectedCurrency(e.target.value);
            setCurrencyAmount(
              +(btcAmount * currencies[e.target.value].rate_float).toFixed(2)
            );
          }}
        >
          {identifiers.map((identifier, index) => (
            <option
              selected={selectedCurrency === identifier}
              key={index}
              value={identifier}
            >
              {currencies[identifier].description + ` (${identifier})`}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <h3>
          BTC to {description} ({code})
        </h3>
        <div className="col-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                BTC
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder={'Enter BTC amount'}
              value={btcAmount}
              onChange={(e) => {
                // Allow empty values
                if (e.target.value === '') return setBtcAmount('');

                // Prevent negative values
                const value = Math.max(+e.target.value, 0);
                setBtcAmount(value);
                setCurrencyAmount(+(value * rate_float).toFixed(2));
              }}
            ></input>
          </div>
        </div>
        <div className="col-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">{code}</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder={`Enter ${code} amount`}
              value={currencyAmount}
              onChange={(e) => {
                // Allow empty values
                if (e.target.value === '') return setBtcAmount('');

                // Prevent negative values
                const value = Math.max(+e.target.value, 0);
                setCurrencyAmount(value);
                setBtcAmount(+(value / rate_float).toFixed(8));
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

ConversionsCard.propTypes = {
  data: PropTypes.object.isRequired
};
