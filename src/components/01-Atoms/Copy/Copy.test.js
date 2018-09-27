import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-enzyme';
import 'jest-styled-components';
import Copy from './Copy.styles';

it('Should render text with normal font size prop', () => {
  const component = <Copy normal>Test Copy</Copy>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', '1em');
});

it('Should render text with large font size prop', () => {
  const component = <Copy large>Test Copy</Copy>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', '14pt');
});