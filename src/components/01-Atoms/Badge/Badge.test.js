import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-enzyme';
import 'jest-styled-components';
import Badge from './Badge.styles';

it('Should render a dark badge when color props is #222222', () => {
  const component = <Badge color="#222222">AA</Badge>;
  const tree = renderer.create(component).toJSON();
  
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', '#ffffff');
});

it('Should render a light badge when color props is #ffffff', () => {
  const component = <Badge color="#ffffff">AA</Badge>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', '#222222');
});