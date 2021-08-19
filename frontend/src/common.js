

const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const BACKEND_HOST = (
    isDev ? "http://192.168.0.83:8081" : "http://192.168.0.83/backend");


export {
    BACKEND_HOST
}