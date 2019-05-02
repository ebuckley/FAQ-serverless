module.exports.handleError = function handleError(err) {
    console.error('lambda http error', err)
    return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(err)
    }
}

// Generate the default headers for the http response
module.exports.headers = (obj) => {
    return Object.assign({}, obj, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    })
}