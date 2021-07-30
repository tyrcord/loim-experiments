import React from 'react';

import { ThermometerDetailsEnum } from '../../enums';
import { formatDegree } from '../../helpers';

import Thermometer from '../thermometer/thermometer';

import styles from './thermometer-details.module.scss';

export interface ThermometerDetailsProps {
  type?: ThermometerDetailsEnum;
  degree?: number;
  tco2e?: number;
  maxDegree?: number;
  warmThreshold?: number;
  hotThreshold?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThermometerDetailsState {}

export class ThermometerDetails extends React.Component<
  ThermometerDetailsProps,
  ThermometerDetailsState
> {
  public static defaultProps: Required<ThermometerDetailsProps> = {
    type: ThermometerDetailsEnum.porfolio,
    degree: 0,
    tco2e: 0,
    maxDegree: 10,
    warmThreshold: 2.5,
    hotThreshold: 5,
  };

  get type() {
    return this.props.type ?? ThermometerDetails.defaultProps.type;
  }

  get tco2e() {
    return this.props.tco2e ?? ThermometerDetails.defaultProps.tco2e;
  }

  get warmThreshold(): number {
    return this.props.warmThreshold ?? Thermometer.defaultProps.warmThreshold;
  }

  get hotThreshold(): number {
    return this.props.hotThreshold ?? Thermometer.defaultProps.hotThreshold;
  }

  state: ThermometerDetailsState = {};

  render() {
    const { degree = 0 } = this.props;
    const title =
      this.type === ThermometerDetailsEnum.porfolio ? 'Portfolio' : 'Benchmark';

    let colorRule = styles.cold;

    if (degree >= this.warmThreshold && degree < this.hotThreshold) {
      colorRule = styles.warm;
    } else if (degree >= this.hotThreshold) {
      colorRule = styles.hot;
    }

    return (
      <div className={styles.container}>
        <div className={styles.graphic}>
          <div className={styles.temperature}>{formatDegree(degree)}</div>
          <Thermometer value={degree} />
        </div>
        <div className={styles.summary}>
          <h3>{title}</h3>
          <div>
            <span className={`${styles.tco2e} ${colorRule}`}>
              {this.tco2e}&nbsp;tC02e
            </span>
            <span>&nbsp;per MUSD invested</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ThermometerDetails;
