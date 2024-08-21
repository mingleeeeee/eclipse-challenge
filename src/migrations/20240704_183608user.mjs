var User = /** @class */ (function () {
    function User() {
        this.up = function (store) {
            store.createTable("user", function (table) {
                table.column("address").varchar(255).primary();
                table.createdAt();
            });
        };
        this.down = function (store) {
            throw new Error("Down is not implemented on user");
        };
    }
    return User;
}());
export default User;