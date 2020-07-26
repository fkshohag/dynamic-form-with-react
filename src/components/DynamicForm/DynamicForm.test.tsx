import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DynamicForm from './DynamicForm';

describe('<DynamicForm />', () => {
  test('it should mount', () => {
    render(<DynamicForm />);
    
    const dynamicForm = screen.getByTestId('DynamicForm');

    expect(dynamicForm).toBeInTheDocument();
  });
});