import React from "react";
import GetAll from "../Component/GetAll";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const event = {
  target: { name: "test", value: "server" },

  preventDefault: () => {}
};
const target = { name: "riskType", value: "LOWRISK" };
const stateData = {
  note: "Expected",
  activeNote: 0,
  addedTime: "12-10-2020",
  completeStatus: 0,
  notificationTime: "12-10-2020",
  priority: 0,
  show: false,
  date: new Date(),

  notes: [],
  noteId: 0,
  currentTime: "",
  activeNote: 0,
  completed: ""
};

configure({ adapter: new Adapter() });

describe("GetAllNote", () => {
  it("should render without error", () => {
    const wrapper = shallow(<GetAll />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("GetAllNote testing", () => {
  it("should render a AddNote and trigger handleChange function", () => {
    const GetAllNoteFormView = shallow(<GetAll />);
    const inputField = GetAllNoteFormView.find("Form");
    const mockEvent = {
      target: {
        value: "test"
      }
    };
    expect(GetAllNoteFormView.first().shallow()).toMatchSnapshot();
  });
});

describe("GetAllNote testing2", () => {
  it("it should render without any error ", () => {
    const wrapper = shallow(<GetAll />);

    const wrapperFunction = wrapper.instance();
    wrapperFunction.handleDelete();
    wrapperFunction.handleComplete();

    expect(wrapper).toMatchSnapshot();
  });
});
