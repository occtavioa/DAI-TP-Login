import sql from "mssql"

export default class dbservice {
    static async login(name, password, connection) {
        const request = new sql.Request(connection)
        return await request
            .input("iname", sql.VarChar(50), name)
            .input("ipassword", sql.VarChar(50), password)
            .query("SELECT * FROM Users WHERE Name=@iname AND Password=@ipassword")
    }

    static async register(name, password, connection) {
        const request = new sql.Request(connection)
        return await request
            .input("iname", sql.VarChar(50), name)
            .input("ipassword", sql.VarChar(50), password)
            .query("INSERT INTO Users VALUES (@iname, @ipassword)")
    }
}
