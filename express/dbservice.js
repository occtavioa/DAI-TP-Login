import sql from "mssql"

export default class dbservice {
    static async login({name, password}, connection) {
        const request = new sql.Request(connection)
        request
            .input("iname", sql.VarChar(), name)
            .input("ipassword", sql.VarChar(), password)
            .query("SELECT (name, password) FROM Users WHERE name=@iname AND password = @ipassword")
            .then(result => {console.log(result);})
            .then(error => {console.log(error);})
    }
}
