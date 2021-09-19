const config = {
    mongoUri: "mongodb+srv://EerieAlchemist:8Qkrt0IpZSO0xguQ@ponjo.xgcp1.mongodb.net/Ponjo-API",
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