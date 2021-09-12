const config = {
    rateLimitResponse: {
        status: 429,
        message: "Too many requests. Try again later.",
        timestamps: {
            date: new Date().toLocaleString(),
            unix: Math.round(+ new Date() / 1000)
        }
    }
}

export default config;