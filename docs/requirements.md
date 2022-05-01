# Tech requirements
## Registration process explanation
1. User joins a telegram bot by a link from the registration page on the site.
2. When user clicks "Start" button telegram messages '/start' command.
3. Message has the following attributes: telegram_user_id, telegram_user_name, telegram_user_first_name, telegram_user_last_name.
4. Node.js app looking for incoming messages. If a message comes, then app parse it.
5. If no user with the same telegram_user_id exists and 'is_bot' attribute for the user is set to false then a response message is sent.
6. Response message has a special token which should be inputted in the registration form to confirm identity.
7. After identity is confirmed the user is added to the database table 'users'.
9. Now registration process is finished and the user may request login tokens by querying the bot with command '/login'.

## Login process explanation
1. A user opens authorization bot in the telegram and sends '/login' command.
2. After command is sent and the telegram user has registration on the service the bot answers with the login token.
3. User inputs the token in the login form on the internet site.
4. If login is correct, then the user is authorized successfully.