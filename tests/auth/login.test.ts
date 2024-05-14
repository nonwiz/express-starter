import { testEndpoint } from "express-zod-api";
import {loginEndpoint} from "../../src/endpoints/auth/login";

// place it once anywhere in your tests
declare module "express-zod-api" {
    interface MockOverrides extends jest.Mock {}
}

test("Login with valid credential", async () => {
    const { responseMock, loggerMock } = await testEndpoint({
        endpoint: loginEndpoint,
        requestProps: {
            method: "POST", // default: GET
            body: {
                email: "oliviabrown@example.com",
                password: "Test"
            },
        },
    });
    expect(responseMock.json).toHaveBeenCalledWith({
        status: "success",
        data: {
            token: expect.stringMatching(/^ey/),
        },
    });
});


test("Login with invalid credential", async () => {
    const { responseMock, loggerMock } = await testEndpoint({
        endpoint: loginEndpoint,
        requestProps: {
            method: "POST", // default: GET
            body: {
                email: "not-existing@example.com",
                password: "Test"
            },
        },
    });
    expect(responseMock.json).toHaveBeenCalledWith({
        status: "error",
        error: {
            message: "User not found"
        },
    });
});
