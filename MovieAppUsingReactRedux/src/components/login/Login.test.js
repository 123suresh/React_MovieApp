import React from "react";
import { shallow, mount } from "enzyme";

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Login from "./Login";
import { findByTestAtrr } from "../../utils/findTestAtrr";

configure({ adapter: new Adapter() });
import { Provider } from "react-redux";
import store from "../../store";

const setUp = (props = {}) => {
  const component = mount(
    <Provider store={store}>
      <Login {...props} />
    </Provider>
  );
  return component;
};

describe("Login component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("should render main container without error", () => {
    const loginComponent = findByTestAtrr(component, "loginContainer");
    expect(loginComponent.length).toBe(1);
  });
});
