import { testEndpoint } from "express-zod-api";
import {loginEndpoint} from "../../src/endpoints/auth/login";
import {getLoginURLWithMicrosoftEndpoint} from "../../src/endpoints/auth/microsoft/login";

test("Login with valid credential", async () => {
    const { responseMock} = await testEndpoint({
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

test("Get login url from microsoft", async () => {
    const { responseMock, loggerMock } = await testEndpoint({
        endpoint: getLoginURLWithMicrosoftEndpoint,
    });
    expect(responseMock.json).toHaveBeenCalledWith({
        status: "success",
        data: {
            url: expect.stringMatching("login.microsoftonline.com"),
            callbackUrl: expect.stringContaining("/v1/auth/microsoft/callback"),
        },
    });
});

