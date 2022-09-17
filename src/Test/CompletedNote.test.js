import React from "react";
import CompletedNote from "../Component/CompletedNote";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const event = {
  target: { name: "test", value: "server" },

  preventDefault: () => {}
};
const target = { name: "riskType", value: "LOWRISK" };
const stateData = {
  notes: [],
  noteId: 1,
  currentTime: "12-03-2020",
  activeNote: 0,
  completed: "12-03-2020"
};

configure({ adapter: new Adapter() });

describe("CompletedNoteNote", () => {
  it("should render without error", () => {
    const wrapper = shallow(<CompletedNote />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("CompletedNoteNote testing", () => {
  it("should render a AddNote and trigger handleChange function", () => {
    const CompletedNoteNoteFormView = shallow(<CompletedNote />);
    const inputField = CompletedNoteNoteFormView.find("Form");
    const mockEvent = {
      target: {
        value: "test"
      }
    };
    expect(CompletedNoteNoteFormView.first().shallow()).toMatchSnapshot();
  });
});

describe("CompletedNoteNote testing2", () => {
  it("it should render without any error ", () => {
    const wrapper = shallow(<CompletedNote />);

    const wrapperFunction = wrapper.instance();
    wrapperFunction.handleComplete();
    wrapperFunction.componentDidMount();

    expect(wrapper).toMatchSnapshot();
  });
});
