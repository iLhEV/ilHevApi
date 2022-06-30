CREATE TABLE users(id int primary key, telegram_user_id int, telegram_username varchar(250));
CREATE SEQUENCE users_id_seq;
alter table users alter column id set default nextval('users_id_seq');
ALTER TABLE IF EXISTS users ADD COLUMN telegram_first_name varchar(250);
ALTER TABLE IF EXISTS users ADD COLUMN telegram_last_name varchar(250);
ALTER TABLE users ADD COLUMN verified boolean;
ALTER TABLE users ADD COLUMN login_token char(30);
ALTER TABLE users ADD COLUMN login_token_expire_at timestamptz;
CREATE TABLE telegram_updates(id bigint primary key);
alter table telegram_updates rename to processed_telegram_updates;
alter table processed_telegram_updates add column is_deferred boolean;
ALTER TABLE users RENAME COLUMN login_token_expire_at TO login_until;
ALTER TABLE users ADD COLUMN be_logged_in_until timestamptz;
ALTER TABLE users RENAME COLUMN telegram_username TO telegram_user_name;

-- if user has joined telegram already, then create user's entry manually by next command.
insert into users(telegram_user_id, telegram_user_name, telegram_first_name) values(165908109, 'iLhEV', 'iLhEV');

CREATE TABLE articles(id int primary key, text text);
CREATE SEQUENCE articles_id_seq;
alter table articles alter column id set default nextval('articles_id_seq');

-- before 27/06/2022 - this migration file is actual and checked.

CREATE TABLE customers(id int primary key, price int, currency varchar(5));
alter table customers add column time_slots json;
CREATE TABLE meetings(id int primary key, customer_id int, time timestamptz, duration smallint);
CREATE SEQUENCE customers_id_seq;
alter table customers alter column id set default nextval('customers_id_seq');
