import { VfcParams, stringOfLength } from '../utils';
import { render } from '@testing-library/react';
import React from 'react';
import Colors from '../Colors';
import MyFcComponent, {
  COLOR_NOT_SUPPORTED_ERROR,
  MINIMUM_NAME_LENGTH,
  PREFIX_DRAFT,
  SUPPORTED_COLORS,
} from './MyFcComponent';

const UNSUPPORTED_COLORS = Object.values(Colors).filter(
  (color) => !SUPPORTED_COLORS.includes(color)
);

const validColor = Colors.RED;
const validName = 'Jimmy';

const renderMyFcComponent = ({
  color = validColor,
  name = validName,
}: Partial<VfcParams<typeof MyFcComponent>>) =>
  render(<MyFcComponent {...{ color, name }} />);

describe('MyFcComponent', () => {
  describe('Color Validation', () => {
    describe.each(UNSUPPORTED_COLORS.map((c) => [c]))(
      'Valid colors (%s)',
      (color) => {
        it(`Displays the error message ${COLOR_NOT_SUPPORTED_ERROR(
          color
        )}`, () => {
          const { getByText } = renderMyFcComponent({ color });
          getByText(COLOR_NOT_SUPPORTED_ERROR(color));
        });
      }
    );

    const unsupportedString = 'unsupported' as Colors;
    it(`For unknown strings displays the message with that string ${COLOR_NOT_SUPPORTED_ERROR(
      unsupportedString
    )}`, () => {
      const color = 'blorange' as Colors;
      const { getByText } = renderMyFcComponent({ color });
      getByText(COLOR_NOT_SUPPORTED_ERROR(color));
    });
  });
  describe('Color application', () => {
    it.each(SUPPORTED_COLORS)(
      `Displays the name text in %s when that color is entered`,
      (color) => {
        const { getByText } = renderMyFcComponent({ color });
        expect(getByText(validName).style.color).toEqual(color);
      }
    );
  });

  describe('Name', () => {
    describe(`Displays the draft prefix (${PREFIX_DRAFT}) while the length of the name is below the Minimum Name Length (${MINIMUM_NAME_LENGTH})`, () => {
      it.each(Array.from(new Array(MINIMUM_NAME_LENGTH).keys()))(
        `%s characters (Minimum)`,
        (length) => {
          const name = stringOfLength(length);
          const { getByText } = renderMyFcComponent({ name });
          getByText(PREFIX_DRAFT(name));
        }
      );
    });
    it(`Displays the name when at least the Minimum Name Length (${MINIMUM_NAME_LENGTH})`, () => {
      const name = stringOfLength(MINIMUM_NAME_LENGTH);
      const { getByText } = renderMyFcComponent({ name });
      getByText(name);
    });
  });
});
