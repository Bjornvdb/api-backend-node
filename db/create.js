const query = `
  -- tabel user
  CREATE TABLE public.user ( 
    user_id         bigserial  NOT NULL,
    user_banned bool NOT NULL DEFAULT false,
    user_email                 VARCHAR(127)  NOT NULL,
    user_password                 VARCHAR(127)  NOT NULL,
    user_date_created           TIMESTAMP  DEFAULT NOW(),
    user_verified bool NOT NULL DEFAULT false,
    CONSTRAINT pk_user_id PRIMARY KEY ( user_id )
  );
`