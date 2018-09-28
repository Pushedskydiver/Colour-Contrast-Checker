import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-enzyme';
import 'jest-styled-components';
import Swatch from './Swatch.styles';

it('Should render a dark swatch when background props is #222222', () => {
  const component = <Swatch background="#222222" foreground="#ffffff" />;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-color', '#222222');
  expect(tree).toHaveStyleRule('color', '#ffffff');
});

it('Should render a light swatch when background props is #ffffff', () => {
  const component = <Swatch background="#ffffff" foreground="#222222" />;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-color', '#ffffff');
  expect(tree).toHaveStyleRule('color', '#222222');
});