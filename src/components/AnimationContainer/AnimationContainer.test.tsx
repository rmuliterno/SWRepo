import { render } from '@testing-library/react';
import AnimationContainer from './index';

test('animation container should render children component', () => {
  const childComponent = <h1>Componente filho</h1>

  const { getByText } = render(
    <AnimationContainer children={childComponent} />
  );

  const check = getByText('Componente filho');
  expect(check).toBeTruthy();
})
