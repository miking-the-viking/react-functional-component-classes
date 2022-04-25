import Colors from '../Colors';

type MyComponentProps = {
  name: string;
  color: Colors;
};

export const COLOR_NOT_SUPPORTED_ERROR = (color: Colors) =>
  `${color} is not supported`;
export const SUPPORTED_COLORS = [Colors.RED, Colors.BLACK, Colors.BLUE];
export const colorIsSupported = (color: Colors) =>
  SUPPORTED_COLORS.includes(color);

export const PREFIX_DRAFT = `Draft: `;
export const MINIMUM_NAME_LENGTH = 2;
export const isDraft = (name: string) => name.length < MINIMUM_NAME_LENGTH;

const MyFcComponent: React.VFC<MyComponentProps> = ({ name, color }) => {
  if (!colorIsSupported(color)) {
    return <p>{COLOR_NOT_SUPPORTED_ERROR(color)}</p>;
  }

  return (
    <p style={{ color }}>
      {isDraft(name) && PREFIX_DRAFT}
      {name}
    </p>
  );
};

export default MyFcComponent;
