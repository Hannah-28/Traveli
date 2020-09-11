import { checkForInfo } from '../client/js/infoChecker'


describe("Checking updateUI function is called", () => {
    test('testing update ui is a function or not', () => {
        expect(typeof(checkForInfo)).toBe('function');
    });
})