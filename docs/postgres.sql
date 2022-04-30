/* Creating simple table. */
CREATE TABLE users(id int primary key, telegram_user_id int, telegram_username varchar(250));

/* Adding column to existing table. */
ALTER TABLE IF EXISTS public.users ADD COLUMN first_name "char";

/* Renaming column in existing table. */
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;

/* Show table details */
\d+ table_name


