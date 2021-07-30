import { render } from '@testing-library/react';

import ThermometerDetails from './thermometer-details';

describe('ThermometerDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThermometerDetails />);
    expect(baseElement).toBeTruthy();
  });
});
