import React from "react";
import { shallow, mount } from "enzyme";

import Terminal from "./index.js";

describe("Terminal", () => {
  let wrapper;
  it("wraps content in a div with .Terminal class", () => {
    wrapper = shallow(<Terminal />);
    expect(wrapper.find(".Terminal").length).toEqual(1);
  });
  it("renders children", () => {
    wrapper = mount(
      <Terminal>
        <div className="test-child-wrapper">This is a test</div>
      </Terminal>
    );
    expect(wrapper.find(".test-child-wrapper").length).toEqual(1);
    expect(wrapper.find(".test-child-wrapper").text()).toEqual(
      "This is a test"
    );
  });
});
