let BASE_URL = ''
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
    
    BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://codercba.com:5000'
} else {
    BASE_URL = 'http://codercba.com:5000'
}

export {
    BASE_URL,
    TIME_OUT
}