import Colors from '../Colors';

type MyComponentProps = {
  name: string;
  color: Colors;
};

export class MyClassComponent {
  static ERRORS = {
    COLOR_NOT_SUPPORTED: (color: Colors) => `${color} is not supported`,
  };

  static SUPPORTED_COLORS = [Colors.RED, Colors.BLACK, Colors.BLUE];
  static colorIsSupported = (color: Colors) =>
    MyClassComponent.SUPPORTED_COLORS.includes(color);

  static MINIMUM_NAME_LENGTH = 2;
  static PREFIX_DRAFT = `Draft: `;
  static isDraft = (name: string) =>
    name.length < MyClassComponent.MINIMUM_NAME_LENGTH;

  static UnsupportedColor: React.VFC<{ color: Colors }> = ({ color }) => (
    <p>{MyClassComponent.ERRORS.COLOR_NOT_SUPPORTED(color)}</p>
  );

  static NameInColor: React.VFC<MyComponentProps> = ({ name, color }) => (
    <p style={{ color }}>
      {this.isDraft(name) && this.PREFIX_DRAFT}
      {name}
    </p>
  );

  static MyClassComponent: React.VFC<MyComponentProps> = ({ name, color }) =>
    MyClassComponent.colorIsSupported(color)
      ? MyClassComponent.NameInColor({ name, color })
      : MyClassComponent.UnsupportedColor({ color });

  // the equivalent of
  // static MyClassComponent: React.VFC<MyComponentProps> = ({ name, color }) => {
  //   if (MyClassComponent.colorIsSupported(color))
  //     return <MyClassComponent.NameInColor {...{ name, color }} />;

  //   return <MyClassComponent.UnsupportedColor {...{ color }} />;
  // };
}

export default MyClassComponent.MyClassComponent;
