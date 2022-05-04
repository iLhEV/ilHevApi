/* Creating simple table. */
CREATE TABLE users(id int primary key, telegram_user_id int, telegram_username varchar(250));

/* Adding column to existing table. */
ALTER TABLE users ADD COLUMN first_name varchar(250);

/* Renaming column in existing table. */
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;

/* Show table details */
\d+ table_name

/* Create sequence and add to existing column. */
CREATE SEQUENCE users_id_seq;
alter table users alter column id set default nextval('users_id_seq');

/* Drop table column. */
alter table users drop column last_name;

/* Alter existing column type */
ALTER TABLE users alter COLUMN login_token_expire_at type timestamptz;

/* Show current timezone */
show timezone;

/* Set current timezone */
set timezone to 'UTC';
set timezone to 'Asia/Tbilisi';

/* Rename table */
alter table telegram_updates rename to processed_telegram_updates;

/* Copy an existing table including data */
create table deferred_telegram_updates as table processed_telegram_updates;

/* Drop table */
drop table deferred_telegram_updates;
