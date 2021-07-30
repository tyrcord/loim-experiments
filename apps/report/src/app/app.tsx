import React from 'react';
import axios, { AxiosResponse } from 'axios';

import styles from './app.module.scss';

import {
  ThermometerDetails,
  HorizontalStackedChart,
} from '@loim-experiments/ui';

import { CarbonFoorprintModel } from '@loim-experiments/shared';
import { horizontalLabelConfig } from './app.config';

const API_DEMO_URL = 'http://localhost:3333/api/demo';

export class App extends React.Component {
  state = {
    portfolio: {
      degree: 1.9,
      tco2e: 290,
    },
    benchmark: {
      degree: 3,
      tco2e: 447,
    },
    spread: [],
  };

  componentDidMount() {
    axios
      .get(API_DEMO_URL)
      .then((response: AxiosResponse<CarbonFoorprintModel>) => {
        const data = response.data;
        this.setState({ spread: data.spread });
      });
  }

  render() {
    const { portfolio, benchmark, spread } = this.state;

    return (
      <div className={styles.app}>
        <h2>Temperature Report</h2>
        <div className={styles.temperatures}>
          <ThermometerDetails
            degree={portfolio.degree}
            tco2e={portfolio.tco2e}
          />
          <ThermometerDetails
            degree={benchmark.degree}
            tco2e={benchmark.tco2e}
          />
        </div>
        <div>
          <h3>Carbon Footprint vs Temperature Alignement</h3>
          <HorizontalStackedChart
            spread={spread}
            legendConfig={horizontalLabelConfig}
          />
        </div>
      </div>
    );
  }
}

export default App;
