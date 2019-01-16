DROP DATABASE IF EXISTS purchase;
CREATE DATABASE purchase;

DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    class varchar(250) NOT NULL,
    family varchar(250) NOT NULL,
    genus varchar(250) NOT NULL,
    species varchar(250) NOT NULL,
    price integer NOT NULL
);