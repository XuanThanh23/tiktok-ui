import * as httpRequest from '~/untils/httpRequest';

export const searchApi = async (q, type = 'less') => {
    try {
        const result = await httpRequest.get(`users`, {
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
