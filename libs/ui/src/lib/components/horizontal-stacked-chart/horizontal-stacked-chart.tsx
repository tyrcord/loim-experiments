import { Bar } from 'react-chartjs-2';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import { LegendConfig } from '../../interfaces';

import './horizontal-stacked-chart.module.scss';

export interface HorizontalStackedChartProps {
  legendConfig: LegendConfig[];
  spread: number[];
}

export class HorizontalStackedChart extends React.Component<HorizontalStackedChartProps> {
  private static defaultConfig = {
    data: {
      labels: [''],
      datasets: [],
    },
    options: {
      events: [],
      responsive: true,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          position: 'bottom',
        },
      },
      animation: {
        duration: 500,
        easing: 'easeInCubic',
      },
    },
  };

  private static defaultDatasetConfig = {
    label: 'Label',
    color: '#000',
    description: '',
  };

  state = {
    ...HorizontalStackedChart.defaultConfig,
    data: {
      ...HorizontalStackedChart.defaultConfig.data,
      datasets: [],
    },
  };

  stackId = uuidv4();

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps: HorizontalStackedChartProps) {
    if (prevProps !== this.props) {
      this.updateData();
    }
  }

  render() {
    const { data, options } = this.state;

    return (
      <div>
        <Bar data={data} options={options}></Bar>
      </div>
    );
  }

  private updateData() {
    const datasets = this.props.spread.map((value: number, index: number) => {
      let datasetConfig = HorizontalStackedChart.defaultDatasetConfig;

      if (this.props.legendConfig) {
        datasetConfig = this.props.legendConfig[index];
      }

      return {
        backgroundColor: datasetConfig.color,
        label: datasetConfig.label,
        stack: this.stackId,
        data: [value],
      };
    });

    this.setState({
      data: { datasets },
    });
  }
}

export default HorizontalStackedChart;
