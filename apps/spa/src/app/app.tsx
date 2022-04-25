import { useState } from 'react';
import styled from 'styled-components';
import Colors from '../Colors';
import MyClassComponent from '../MyClassComponent/MyClassComponent';
import MyFcComponent from '../MyFcComponent/MyFcComponent';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [name, setName] = useState('');
  const [color, setColor] = useState<Colors>(Colors.BLACK);

  const props = { name, color };

  return (
    <StyledApp>
      <input
        type={'text'}
        value={name}
        onChange={(evt) => {
          setName(evt.target.value);
        }}
      />
      <input
        type={'text'}
        value={color}
        onChange={(evt) => {
          setColor(evt.target.value as Colors);
        }}
      />
      <hr />
      <MyFcComponent {...props} />
      <hr />
      <MyClassComponent {...props} />
      <hr />
    </StyledApp>
  );
}

export default App;
