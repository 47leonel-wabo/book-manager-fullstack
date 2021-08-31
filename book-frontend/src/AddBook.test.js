import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AddBook from "../src/components/AddBook";

Enzyme.configure({ adapter: new Adapter() });
// Test that there is six (06) TextField in AddBook component
describe("<AddBook />", () => {
    it("render 6 <TextField/> components", () => {
        const wrapper = shallow(<AddBook />);
        expect(wrapper.find("TextField")).toHaveLength(6);
    });
});
