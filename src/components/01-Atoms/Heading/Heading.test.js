import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-enzyme';
import 'jest-styled-components';
import { Heading1 } from './Heading.styles';
import { typography } from '../../../styles/settings.typography.styles';

it('Should render a heading 1 with tiny font size prop', () => {
  const component = <Heading1 tiny>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.tiny);
});

it('Should render a heading 1 with small font size prop', () => {
  const component = <Heading1 small>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.small);
});

it('Should render a heading 1 with regular font size prop', () => {
  const component = <Heading1 regular>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.regular);
});

it('Should render a heading 1 with medium font size prop', () => {
  const component = <Heading1 medium>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.medium);
});

it('Should render a heading 1 with big font size prop', () => {
  const component = <Heading1 big>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.big);
});

it('Should render a heading 1 with large font size prop', () => {
  const component = <Heading1 large>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.large);
});

it('Should render a heading 1 with xl font size prop', () => {
  const component = <Heading1 xl>Heading</Heading1>;
  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('font-size', typography.heading.size.xl);
});
