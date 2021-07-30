import React from 'react';

import { ThermometerProps, ThermometerState } from '../../interfaces';

import styles from './thermometer.module.scss';

export class Thermometer extends React.Component<
  ThermometerProps,
  ThermometerState
> {

  // Demo purpose, should be a canvas or a svg 
  private static minHeighPercentage = 72 / 353;

  public static defaultProps: Required<ThermometerProps> = {
    value: 0,
    maxValue: 10,
    warmThreshold: 2.5,
    hotThreshold: 5,
  };

  state: ThermometerState = {
    formattedValue: '0%',
    value: 0,
  };

  get maxValue(): number {
    return this.props.maxValue ?? Thermometer.defaultProps.maxValue;
  }

  get warmThreshold(): number {
    return this.props.warmThreshold ?? Thermometer.defaultProps.warmThreshold;
  }

  get hotThreshold(): number {
    return this.props.hotThreshold ?? Thermometer.defaultProps.hotThreshold;
  }

  componentDidMount(): void {
    if (document.readyState === 'complete') {
      this.onReady();
    } else {
      document.addEventListener('readystatechange', this.onReady);
    }
  }

  componentDidUpdate(previousProps: ThermometerProps): void {
    if (this.props.value !== previousProps.value) {
      this.update(this.props.value);
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('readystatechange', this.onReady);
  }

  render(): JSX.Element {
    const { value: degree = 0 } = this.props;
    const gradientStyle = {
      height: this.state.formattedValue,
    };

    let colorRule = styles.cold;

    if (degree >= this.warmThreshold && degree < this.hotThreshold) {
      colorRule = styles.warm;
    } else if (degree >= this.hotThreshold) {
      colorRule = styles.hot;
    }

    const gradientClassNames = `${styles.gradient} ${colorRule}`;

    return (
      <div className={styles.container}>
        <div className={styles.graphic}></div>
        <div className={gradientClassNames} style={gradientStyle}></div>
      </div>
    );
  }

  private onReady = (): void => {
    if (document.readyState === 'complete') {
      this.update(this.props.value);
    }
  };

  private update(degree = 0): void {
    if (typeof degree === 'number') {
      const percentage = this.convertDegreeToPercentage(degree);

      this.setState({
        formattedValue: `${percentage * 100}%`,
        value: percentage,
      });
    }
  }

  private convertDegreeToPercentage(degree: number): number {
    if (degree <= 0) {
      return 0;
    }

    if (degree >= this.maxValue) {
      return 100;
    }

    const distance = 1 - Thermometer.minHeighPercentage;
    const ratio = degree / this.maxValue;

    return ratio * distance + Thermometer.minHeighPercentage;
  }
}

export default Thermometer;
