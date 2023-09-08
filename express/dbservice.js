import sql from "mssql";

export default class dbservice {
    static async selectUserId(name, password, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pName", sql.VarChar(50), name)
            .input("pPassword", sql.VarChar(50), password)
            .query("SELECT Id FROM Users WHERE Name=@pName AND Password=@pPassword");
    }

    static async insertUser(name, password, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pName", sql.VarChar(50), name)
            .input("pPassword", sql.VarChar(50), password)
            .query("INSERT INTO Users VALUES (@pName, @pPassword)");
    }

    static async selectUserById(id, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pId", sql.Int, id)
            .query("SELECT * FROM Users WHERE Id=@pId");
    }
}
