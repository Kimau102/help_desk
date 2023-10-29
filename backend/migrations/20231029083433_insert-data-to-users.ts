import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const txn = await knex.transaction();
    try {
        // 添加第一个用户（成功）
        await txn("users").insert({
            first_name: "User1",
            last_name: "Last1",
            email: "user1@example.com",
            password: "password1",
            admin_authorization: 1,
            user_authorization: 0,
            address: "Address1",
        });

        // 添加第二个用户（故意引发错误）
        await txn("users").insert({
            first_name: "User2",
            last_name: "Last2",
            email: "user1@example.com", // 与第一个用户相同的 email
            password: "password2",
            admin_authorization: 0,
            user_authorization: 1,
            address: "Address2",
        });

        await txn.commit();
        return;
    } catch (e) {
        console.log("Error:", e);
        await txn.rollback();
        return;
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex("users")
        .where({ email: "user1@example.com" })
        .del();
}
