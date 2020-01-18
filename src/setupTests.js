 /**
  * Change the `test` command in package.json file to `"test": "react-scripts test --setupFiles ./src/setupTests.js",`
  * After changing the command, Jest runs this script before every test.
  */

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ 
  adapter: new Adapter(),
  disableLifecycleMethods: true, // We disable the lifecycle methods to run automatically whenever wrapper is created. In this way, we can manually call lifecycle method as we need in the test.
});