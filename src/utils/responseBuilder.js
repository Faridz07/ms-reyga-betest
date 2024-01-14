const buildResponse = (res, status, message, data = null) => {
    const response = {
        code: status,
        message
    };

    if (data) {
        response.data = data;
    }

    res.status(status).json(response);
};

module.exports = buildResponse;