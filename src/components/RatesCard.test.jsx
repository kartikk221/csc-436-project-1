import React from 'react';
import { render } from '@testing-library/react';
import RatesCard from './RatesCard';

describe('RatesCard component', () => {
  const mockData = {
    bpi: {
      USD: {
        code: 'USD',
        rate_float: Math.random() * 60000 + 1000
      },
      GBP: {
        code: 'GBP',
        rate_float: Math.random() * 60000 + 1000
      },
      EUR: {
        code: 'EUR',
        rate_float: Math.random() * 60000 + 1000
      }
    }
  };

  it('Checks for 1 {CURRENCY_CODE} equals formatting', async () => {
    const { getByText } = await render(<RatesCard data={mockData} />);
    // Check for "1 {code} equals" format
    Object.keys(mockData.bpi).forEach((identifier) => {
      const { code, rate_float } = mockData.bpi[identifier];
      const one_usd_equals = 1 / rate_float;
      const one_btc_equals = rate_float.toFixed(2);
      const expected = `1 ${code} equals ${one_usd_equals} BTC, 1 BTC equals ${one_btc_equals} ${code}`;
      const actual = getByText(
        (_, element) => element.textContent === expected
      );
      expect(actual).toBeTruthy();
    });
  });
});
