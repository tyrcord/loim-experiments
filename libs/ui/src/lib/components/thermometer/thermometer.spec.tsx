import { render } from '@testing-library/react';

import Thermometer from './thermometer';

describe('Thermometer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Thermometer />);
    expect(baseElement).toBeTruthy();
  });
});
