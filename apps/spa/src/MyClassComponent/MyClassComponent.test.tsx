import { render } from '@testing-library/react';
import Colors from '../Colors';
import { VfcParams } from '../utils';
import Component, { MyClassComponent } from './MyClassComponent';

const UNSUPPORTED_COLORS = Object.values(Colors).filter(
  (color) => !MyClassComponent.SUPPORTED_COLORS.includes(color)
);

const validColor = Colors.RED;
const validName = 'Jimmy';

const unsupportedColorSpy = jest.spyOn(MyClassComponent, 'UnsupportedColor');
const NameInColorSpy = jest.spyOn(MyClassComponent, 'NameInColor');

const renderMyClassComponent = ({
  name = validName,
  color = validColor,
}: Partial<VfcParams<typeof Component>>) =>
  render(<Component {...{ name, color }} />);

describe('MyClassComponent', () => {
  describe('Color Validation', () => {
    const color = 'bluorange' as Colors;
    it(`Displays the error message ${MyClassComponent.ERRORS.COLOR_NOT_SUPPORTED(
      color
    )}`, () => {
      const { getByText } = renderMyClassComponent({ color });
      getByText(MyClassComponent.ERRORS.COLOR_NOT_SUPPORTED(color));
      // renderMyClassComponent({ color: 'bluorange' as any });

      expect(unsupportedColorSpy).toHaveBeenCalled();
      // Spy to assert other way was never rendered?
      expect(NameInColorSpy).not.toHaveBeenCalled();
    });
  });
});
