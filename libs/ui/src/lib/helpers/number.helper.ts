import numeral from 'numeral';

export function formatDegree(number = 0): string {
  return `${numeral(number).format('0[.]00')}°C`;
}
