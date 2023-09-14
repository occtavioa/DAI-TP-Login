import sql from "mssql";

export default class dbservice {
    static async selectUserId(username, password, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pUserName", sql.VarChar(50), username)
            .input("pPassword", sql.VarChar(50), password)
            .query("SELECT Id FROM Users WHERE UserName=@pUserName AND Password=@pPassword");
    }

    static async insertUser(username, password, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pUserName", sql.VarChar(50), username)
            .input("pPassword", sql.VarChar(50), password)
            .query("INSERT INTO Users (UserName, Password) VALUES (@pUserName, @pPassword)");
    }

    static async selectUserById(id, connection) {
        const request = new sql.Request(connection);
        return await request
            .input("pId", sql.Int, id)
            .query("SELECT * FROM Users WHERE Id=@pId");
    }
}
