import React from "react";
import AddNote from "../Component/AddNote";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const event = {
  target: { name: "test", value: "server" },

  preventDefault: () => {}
};

const target = { name: "riskType", value: "LOWRISK" };
const stateData = {
  noteId: 1,
  note: "Test",
  modified: "12-10-2020",
  notificationTime: "12-10-2020",
  priority: 1,
  show: false
};
configure({ adapter: new Adapter() });

describe("AddNoteForm", () => {
  it("should render without error", () => {
    const wrapper = shallow(<AddNote />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("form testing", () => {
  it("should render without error", () => {
    const wrapper = shallow(<AddNote />);
    const input = wrapper.find("Form");
    expect(input.length).toBe(1);
  });
});
describe("label testing", () => {
  it("should render without error", () => {
    const wrapper = shallow(<AddNote />);
    const input = wrapper.find("label");
    expect(input.length).toBe(1);
  });
});

describe("AddNoteForm testing", () => {
  it("should render a AddNote and trigger handleChange function", () => {
    const AddNoteFormView = shallow(<AddNote />);
    const inputField = AddNoteFormView.find("Form");
    const mockEvent = {
      target: {
        value: "test"
      }
    };
    inputField.simulate("change", mockEvent);
    expect(AddNoteFormView.first().shallow()).toMatchSnapshot();
  });
});

describe("AddNoteForm testing2", () => {
  it("it should render without any error ", () => {
    const wrapper = shallow(<AddNote />);

    const wrapperFunction = wrapper.instance();
    wrapperFunction.setState(stateData);
    wrapperFunction.handleChange(event);
    wrapperFunction.handleSubmit(event);
    wrapperFunction.onClick(event);
    wrapperFunction.handleChange({ target });

    expect(wrapper).toMatchSnapshot();
  });
});
