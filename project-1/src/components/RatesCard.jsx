import React from 'react';

export default function RatesCard({ data }) {
    const currencies = data.bpi;
    const identifiers = Object.keys(currencies);

    return identifiers.map((identifier, index) => {
        const { code, rate_float } = currencies[identifier];
        return (
            <h2 key={index} className="mt-5">
                1 {code} equals <strong>{1 / rate_float} BTC</strong>, 1 BTC equals{' '}
                <strong>
                    {rate_float.toFixed(2)} {code}
                </strong>
            </h2>
        );
    });
}
