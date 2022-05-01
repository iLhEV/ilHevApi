CREATE TABLE users(id int primary key, telegram_user_id int, telegram_username varchar(250));
CREATE SEQUENCE users_id_seq;
alter table users alter column id set default nextval('users_id_seq');
ALTER TABLE IF EXISTS users ADD COLUMN telegram_first_name varchar(250);
ALTER TABLE IF EXISTS users ADD COLUMN telegram_last_name varchar(250);
ALTER TABLE users ADD COLUMN verified boolean;