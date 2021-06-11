import { render } from '@testing-library/react';
import DefaultLayout from './index';

test('default layout should render children component', () => {
  const childComponent = <h1>Componente filho</h1>

  const { getByText } = render(
    <DefaultLayout children={childComponent} />
  );

  const check = getByText('Componente filho');
  expect(check).toBeTruthy();
})
