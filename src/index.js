import { checkEndpoint } from './api/check.js';

const endpoints = {
    "/api/check" : {
        method: "GET",
        epFunction: checkEndpoint,
    }
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        const path = url.pathname;
        const method = request.method;

        const params = url.searchParams;

        const endpoint = endpoints[path];

        if (endpoint.method !== method) return Response.json({ error: 'Method Not Allowed' }, { status: 405 });

        return await endpoint.epFunction(params, env);
    },
};
