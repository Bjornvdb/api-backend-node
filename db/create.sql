
-- tabel user
CREATE TABLE public.user (
  user_id bigserial NOT NULL,
  user_banned bool NOT NULL DEFAULT false,
  user_email varchar(127) NOT NULL,
  user_password varchar(127) NOT NULL,
  user_first_name varchar(127) DEFAULT NULL,
  user_last_name varchar(127) DEFAULT NULL,
  user_birth_date timestamp DEFAULT NULL,
  user_date_created timestamp NULL DEFAULT now(),
  user_verified bool NOT NULL DEFAULT false,
  user_verified_date timestamp DEFAULT NULL,
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);