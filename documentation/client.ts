type GetV1HelloInput = {
    name?: string | undefined;
};

type GetV1HelloResponse = {
    status: "success";
    data: {
        greetings: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostV1AuthLoginInput = {
    email: string;
    password: string;
};

type PostV1AuthLoginResponse = {
    status: "success";
    data: {
        token: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type GetV1AuthHelloInput = {} & {};

type GetV1AuthHelloResponse = {
    status: "success";
    data: {
        greetings: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

type PostV1AuthRefreshTokenInput = {} & {};

type PostV1AuthRefreshTokenResponse = {
    status: "success";
    data: {
        token: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/v1/hello" | "/v1/auth/login" | "/v1/auth/hello" | "/v1/auth/refresh-token";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /v1/hello": GetV1HelloInput;
    "post /v1/auth/login": PostV1AuthLoginInput;
    "get /v1/auth/hello": GetV1AuthHelloInput;
    "post /v1/auth/refresh-token": PostV1AuthRefreshTokenInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /v1/hello": GetV1HelloResponse;
    "post /v1/auth/login": PostV1AuthLoginResponse;
    "get /v1/auth/hello": GetV1AuthHelloResponse;
    "post /v1/auth/refresh-token": PostV1AuthRefreshTokenResponse;
}

export const jsonEndpoints = { "get /v1/hello": true, "post /v1/auth/login": true, "get /v1/auth/hello": true, "post /v1/auth/refresh-token": true };

export const endpointTags = { "get /v1/hello": [], "post /v1/auth/login": [], "get /v1/auth/hello": [], "post /v1/auth/refresh-token": [] };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = async (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}

// Usage example:
/*
export const exampleImplementation: Implementation = async (method, path, params) => { const hasBody = !["get", "delete"].includes(method); const searchParams = hasBody ? "" : `?${new URLSearchParams(params)}`; const response = await fetch(`https://example.com${path}${searchParams}`, { method: method.toUpperCase(), headers: hasBody ? { "Content-Type": "application/json" } : undefined, body: hasBody ? JSON.stringify(params) : undefined }); if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
} return response.text(); };
const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });*/ 