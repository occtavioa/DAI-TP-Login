import sql from "mssql";

export default class dbservice {
    static async selectUserByCredentials(username, password, connection) {
        let request = new sql.Request(connection);
        return await request
            .input("pUserName", sql.VarChar(50), username)
            .input("pPassword", sql.VarChar(50), password)
            .query("SELECT * FROM Users WHERE UserName=@pUserName AND Password=@pPassword");
    }

    static async insertUser(username, password, connection) {
        let request = new sql.Request(connection);
        return await request
            .input("pUserName", sql.VarChar(50), username)
            .input("pPassword", sql.VarChar(50), password)
            .query("INSERT INTO Users (UserName, Password) VALUES (@pUserName, @pPassword)");
    }

    static async selectUserById(id, connection) {
        let request = new sql.Request(connection);
        return await request
            .input("pId", sql.Int, id)
            .query("SELECT * FROM Users WHERE Id=@pId");
    }

    static async updateUser(id, user, connection) {
        let request = new sql.Request(connection)
        return await request
            .input("pId", sql.Int, id)
            .input("pUserName", sql.VarChar(50), user.username)
            .input("pPassword", sql.VarChar(50), user.password)
            .input("pName", sql.VarChar(50), user.name)
            .input("pSurname", sql.VarChar(50), user.surname)
            .query("UPDATE Users SET UserName=@pUserName, Password=@pPassword, Name=@pName, Surname=@pSurname WHERE Id=@pId")
    }

    static async selectUserByUsername(username, connection) {
        let request = new sql.Request(connection)
        return await request
            .input("pUserName", sql.VarChar(50), username)
            .query("SELECT * FROM Users WHERE UserName=@pUserName")
    }
}
