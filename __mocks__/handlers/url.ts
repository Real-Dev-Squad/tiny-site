import { rest } from 'msw';

import { TINY_API_URL } from '@/constants/url';

import urls from '../db/urls';

const urlHandler = [
    rest.get(`${TINY_API_URL}/user/1/urls`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(urls));
    }),
];

const notFoundUrls = rest.get(`${TINY_API_URL}/user/1/urls`, (_, res, ctx) => {
    return res(
        ctx.status(404),
        ctx.json({
            statusCode: 404,
            error: 'Not Found',
            message: 'urls not found',
        })
    );
});

const failedUrls = rest.get(`${TINY_API_URL}/user/1/urls`, (_, res) => {
    return res.networkError('Failed to fetch');
});

export { failedUrls, notFoundUrls, urlHandler };
