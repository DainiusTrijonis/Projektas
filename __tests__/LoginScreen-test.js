/**
 * @format
 */

import 'react-native';
import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<App rendering />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});