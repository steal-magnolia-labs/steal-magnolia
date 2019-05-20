-- -------------------------------------------------------------
-- TablePlus 2.3(222)
--
-- https://tableplus.com/
--
-- Database: ddsu160rb5t7vq
-- Generation Time: 2019-05-18 15:48:36.1510
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS nodes_id_seq;

-- Table Definition
CREATE TABLE "public"."nodes" (
    "id" int4 NOT NULL DEFAULT nextval('nodes_id_seq'::regclass),
    "project_id" int4 NOT NULL,
    "parent_id" int4,
    "name" varchar NOT NULL,
    "stateful" bool NOT NULL DEFAULT false,
    "state" json,
    "props" json,
    "count" varchar DEFAULT '1'::character varying,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS projects_id_seq;

-- Table Definition
CREATE TABLE "public"."projects" (
    "id" int4 NOT NULL DEFAULT nextval('projects_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "name" varchar NOT NULL,
    "created_at" date DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."nodes" ("id", "project_id", "parent_id", "name", "stateful", "state", "props", "count") VALUES ('4', '6', NULL, 'App', 't', NULL, NULL, '1');

INSERT INTO "public"."projects" ("id", "user_id", "name", "created_at") VALUES ('6', '2', 'My Awesome React App', '2019-05-18');

INSERT INTO "public"."users" ("id", "first_name", "last_name", "email") VALUES ('2', 'Conor', 'Sexton', 'sextonc@me.com');

ALTER TABLE "public"."nodes" ADD FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");
ALTER TABLE "public"."nodes" ADD FOREIGN KEY ("parent_id") REFERENCES "public"."nodes"("id");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
