import requests from "./request";

export const login = (params) => requests({
    url: '/login',
    method: 'POST',
    data: params,
});

export const report = () => requests({
    url: '/report',
    method: 'POST',
});

export const getMenus = () => requests({
    url: '/admin/user/menus',
    method: 'GET',
});

export const getAdmin = () => requests({
    url: '/admin',
    method: 'GET',
});

export const getUserArea = (params) => requests({
    url: '/admin/users/area',
    method: 'GET',
    params: params
});
export const getWebsiteView = (params) => requests({
    url: `/admin/view/${params}`,
    method: 'GET',
});
export const getDirection = () => requests({
    url: '/direction',
    method: 'GET',
});
export const getRegion = (type) => requests({
    url: '/admin/users/area',
    method: 'GET',
    params: {
        type: type
    }
});
export const getCourse = () => requests({
    url: '/course',
    method: 'GET',
});
export const getUser = (keywords) => requests({
    url: '/admin/users/info',
    method: 'GET',
    params: {
        keywords: keywords,
    }
});
export const getRole = (keywords) => requests({
    url: '/admin/roles',
    method: 'GET',
    params: {
        keywords: keywords,
    }
});
export const getOperationLog = (keywords, type) => requests({
    url: '/admin/operation/logs',
    method: 'GET',
    params: {
        keywords: keywords,
        type: type
    }
});
export const getAdminMenus = (keywords, type) => requests({
    url: '/admin/menus',
    method: 'GET',
    params: {
        keywords: keywords,
        type: type
    }
});

