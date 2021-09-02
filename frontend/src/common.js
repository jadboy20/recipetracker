

const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const BACKEND_HOST = (
    isDev ? "http://192.168.0.83:8080" : "http://192.168.0.83/backend");

const isStandardString = (string) => {
    if (string.length === "") {
        return false;
    }

    if (string.trim() === "") {
        return false;
    }

    return true;
}

export {
    BACKEND_HOST,
    isStandardString
}