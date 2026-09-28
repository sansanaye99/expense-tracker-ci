CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description VARCHAR(255) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  date DATE NOT NULL
);

INSERT INTO categories (name) VALUES
  ('Groceries'),
  ('Transport');

INSERT INTO expenses (description, amount, date) VALUES
  ('Groceries', 42.50, '2026-08-01'),
  ('Bus ticket', 3.20, '2026-08-03');
