import { render } from '@testing-library/react';
import React from 'react';
import Colors from '../Colors';
import { MyClassComponent } from '../MyClassComponent/MyClassComponent';
import MyFcComponent, {
  COLOR_NOT_SUPPORTED_ERROR,
  MINIMUM_NAME_LENGTH,
  PREFIX_DRAFT,
  SUPPORTED_COLORS,
} from './MyFcComponent';

const UNSUPPORTED_COLORS = Object.values(Colors).filter(
  (color) => !SUPPORTED_COLORS.includes(color)
);

/**
 * A Consistent valid color
 */
const validColor = Colors.RED;

type VfcParams<T> = T extends React.VFC<infer R> ? R : never;

const renderMyFcComponent = ({
  color,
  name,
}: VfcParams<typeof MyFcComponent>) =>
  render(<MyFcComponent {...{ color, name }} />);

describe('MyFcComponent', () => {
  describe('Color Validation', () => {
    describe.each(UNSUPPORTED_COLORS.map((c) => [c]))(
      'Valid colors (%s)',
      (color) => {
        it(`Displays the error message ${COLOR_NOT_SUPPORTED_ERROR(
          color
        )}`, () => {
          expect(false).toBeTruthy();
        });
      }
    );
    const unsupportedString = 'unsupported' as Colors;
    it.todo(
      `For unknown strings displays the message with that string ${COLOR_NOT_SUPPORTED_ERROR(
        unsupportedString
      )}`
    );
  });
  describe('Color application', () => {
    it.each(SUPPORTED_COLORS)(
      `Displays the name text in %s when that color is entered`,
      () => {
        expect(false).toBeTruthy();
      }
    );
  });

  describe('Name', () => {
    describe(`Displays the draft prefix (${PREFIX_DRAFT}) while the length of the name is below the Minimum Name Length (${MINIMUM_NAME_LENGTH})`, () => {
      it.each(Array.from(new Array(MINIMUM_NAME_LENGTH).keys()))(
        `%s characters (Minimum)`,
        (length) => {
          expect(false).toBeTruthy();
        }
      );
    });
    it(
      `Displays the name when at least the Minimum Name Length (${MINIMUM_NAME_LENGTH})`
    );
  });
});
