CREATE TABLE invitations (
  code text PRIMARY KEY,
  used boolean NOT NULL DEFAULT false
);

CREATE TABLE users (
  email text PRIMARY KEY,
  is_admin boolean NOT NULL DEFAULT false
);
