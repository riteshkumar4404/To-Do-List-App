import React from "react";
import EditeNote from "../Component/EditNote";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const event = {
  target: { name: "test", value: "server" },

  preventDefault: () => {}
};

const target = { name: "riskType", value: "LOWRISK" };
const stateData = {
  note: "This is test",
  activeNote: 0,
  addedTime: "1",
  completeStatus: 0,
  notificationTime: "1",
  priority: 0,
  show: false,
  date: new Date()
};
configure({ adapter: new Adapter() });

describe("EditeNoteForm", () => {
  it("should render without error", () => {
    const wrapper = shallow(<EditeNote />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("form testing", () => {
  it("should render without error", () => {
    const wrapper = shallow(<EditeNote />);
    const input = wrapper.find("Form");
    expect(input.length).toBe(1);
  });
});

describe("label testing", () => {
  it("should render without error", () => {
    const wrapper = shallow(<EditeNote />);
    const input = wrapper.find("label");
    expect(input.length).toBe(1);
  });
});

describe("EditeNoteForm testing", () => {
  it("should render a EditeNote and trigger handleChange function", () => {
    const EditeNoteFormView = shallow(<EditeNote />);
    const inputField = EditeNoteFormView.find("Form");
    const mockEvent = {
      target: {
        value: "test"
      }
    };
    inputField.simulate("change", mockEvent);
    expect(EditeNoteFormView.first().shallow()).toMatchSnapshot();
  });
});

describe("EditeNoteForm testing2", () => {
  it("it should render without any error ", () => {
    const wrapper = shallow(<EditeNote />);

    const wrapperFunction = wrapper.instance();
    wrapperFunction.setState(stateData);
    wrapperFunction.handleChange(event);
    wrapperFunction.handleSubmit(event);
    wrapperFunction.handleChange({ target });
    wrapperFunction.onClick(event);

    expect(wrapper).toMatchSnapshot();
  });
});
