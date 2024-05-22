import {testEndpoint} from "express-zod-api";
import {helloWithAuthEndpoints} from "../../src/endpoints/hello";

jest.mock('@/utils/auth', () => ({
    verifyToken: jest.fn(),
    decodeToken: jest.fn(),
}));

const { verifyToken, decodeToken } = require('@/utils/auth');

test("Test hello with auth endpoint", async () => {

    verifyToken.mockReturnValue(true);
    decodeToken.mockReturnValue({name: "olivia"});
    const { responseMock} = await testEndpoint({
        endpoint: helloWithAuthEndpoints,
        requestProps: {
            method: "GET",
            headers: {
                authorization: 'Bearer valid-token',
            }
        },
    });
    expect(responseMock.json).toHaveBeenCalledWith({
        status: "success",
        data: {
            greetings: expect.stringContaining("OLIVIA")
        },
    });
});

