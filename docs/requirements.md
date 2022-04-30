# Tech requirements
## Registration process explanation
1. User joins telegram bot by link from registration page on the site.
2. When user clicks "Start" button telegram message with command '/start' is sending.
3. Message has the following attributes: telegram_user_id, telegram_user_name, telegram_user_first_name, telegram_user_last_name.
4. Node.js app looking for incoming messages. If a message comes, then app parse it.
5. If no user with same telegram_user_id exists, then user will be added to database table 'users'. Also, the user should not have 'is_bot' attribute in true value.
6. Every time new user is added, response message will be sent to the new user.
7. In this message user get special token which user should input in the registration form to confirm identity.
8. After identity is confirmed user will get possibility to request login tokens by querying the bot with command '/login'.

 