import sql from "mssql"

export default class dbservice {
    static async login({name, password}, connection) {
        const request = new sql.Request(connection)
        request
            .input("iname", sql.VarChar(), name)
            .input("ipassword", sql.VarChar(), password)
            .query("SELECT * FROM Users WHERE name=@iname AND password=@ipassword")
            .then(result => result)
            .catch(error => error)
    }

    static async register({name, password}, connection) {
        const transaction = new sql.Transaction(connection)
        transaction
            .begin()
            .then(transaction => {
                const request = new sql.Request(transaction)
                request
                    .input("iname", sql.VarChar(), name)
                    .input("ipassword", sql.VarChar(), password)
                    .query("INSERT INTO Users VALUES (@iname, @ipassword)")
                    .then(() => {transaction.commit()})
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
}
