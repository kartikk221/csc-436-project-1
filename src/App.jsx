import React, { useEffect, useState } from 'react';
import { get_cache_expires_at, get_conversion_data } from './modules/data';
import RatesCard from './components/RatesCard';
import ConversionsCard from './components/ConversionsCard';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [sectionIndex, setSectionIndex] = useState(0);
  useEffect(() => {
    get_conversion_data().then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  if (Object.keys(data).length === 0) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>{data.chartName}</h1>
      <p>
        This data was updated on{' '}
        <strong>{new Date(data.time.updatedISO).toLocaleString()}</strong>.{' '}
        <a
          href="#"
          onClick={() => {
            const expires_at = get_cache_expires_at();
            if (expires_at > Date.now()) {
              alert(
                'The data was recently refreshed. Please wait until ' +
                  new Date(expires_at).toLocaleString() +
                  ' to refresh again.'
              );
              return;
            } else {
              get_conversion_data().then((data) => {
                setData(data);
                alert('Sucessfully refreshed data!');
              });
            }
          }}
        >
          Click to refresh
        </a>
      </p>

      <nav
        className="navbar navbar-expand-lg navbar-light bg-light mb-3"
        style={{
          borderRadius: '1em'
        }}
      >
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            {['Rates', 'Conversions'].map((section, index) => (
              <button
                key={index}
                className={
                  'nav-item btn ' +
                  (index === sectionIndex ? 'btn-dark' : 'btn-light')
                }
                onClick={() => setSectionIndex(index)}
              >
                {section}
              </button>
            ))}
          </ul>
        </div>
      </nav>

      {sectionIndex === 0 && <RatesCard data={data} />}

      {sectionIndex === 1 && <ConversionsCard data={data} />}

      <p className="mt-5">CSC 436 Project 1 - By Kartik Kumar</p>
    </div>
  );
}

export default App;
