import * as request from '~/untils/request';

export const searchApi = async (q, type = 'less') => {
    try {
        const result = await request.get(`users`, {
            params: {
                q,
                type,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};
