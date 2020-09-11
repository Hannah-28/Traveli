// Import the js file to test
import { handleSubmit } from '../client/js/formHandler'

test("Testing the handleSubmit() function", () => {
    expect(handleSubmit).toBeDefined();
});