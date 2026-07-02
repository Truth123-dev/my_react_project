-- Run these commands in psql or a DB GUI as a superuser
-- 1) create the database
CREATE DATABASE todo_db;

-- 2) connect to the database (in psql use \c todo_db)

-- 3) create users table
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 4) create todos table
CREATE TABLE IF NOT EXISTS todos (
  id serial PRIMARY KEY,
  title text NOT NULL,
  priority text NOT NULL DEFAULT 'normal',
  due_date date,
  completed boolean NOT NULL DEFAULT false,
  user_id integer REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);
