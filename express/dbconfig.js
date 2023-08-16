const sqlConfig = {
    user: "",
    password: "",
    database: "DAI-TP-Login",
    server: 'localhost',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export default sqlConfig
