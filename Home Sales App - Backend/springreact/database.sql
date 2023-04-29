CREATE DATABASE homesalesappdb;

USE homesalesappdb;

CREATE TABLE prices(
    id int(11) auto_increment NOT NULL,
    value varchar(100) NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    CONSTRAINT pk_prices PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE roles(
    id int(11) auto_increment NOT NULL,
    role_name varchar(100) NOT NULL,
    CONSTRAINT pk_profile PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE users(
    id int(11) auto_increment NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    username varchar(200) NOT NULL,
    password varchar(255) NOT NULL,
    status int NOT NULL,
    roleId int(11),
    register_code varchar(100),
    register_date date NOT NULL,
    description MEDIUMTEXT NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY(id),
    CONSTRAINT fk_role_user FOREIGN KEY(roleId) REFERENCES roles (id) ON DELETE SET NULL,
    CONSTRAINT uq_email UNIQUE (email),
    CONSTRAINT uq_username UNIQUE (username),
)ENGINE=InnoDB;


CREATE TABLE categories(
    id int(11) auto_increment NOT NULL,
    name varchar(100) NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    CONSTRAINT pk_categories PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE properties(
    id int(11) auto_increment NOT NULL,
    title varchar(200) NOT NULL,
    description LONGTEXT  NOT NULL,
    rooms int(11),
    parking int(11),
    wc int(11),
    location varchar(200) NOT NULL,
    image varchar(255) NOT NULL,
    published TINYINT NOT NULL,
    createdAt date NOT NULL,
    updatedAt date,
    priceId int(11) NOT NULL,
    categoryId int(11) NOT NULL,
    userId int(11) NOT NULL,
    status varchar(45) NOT NULL,
    CONSTRAINT pk_properties PRIMARY KEY(id),
    CONSTRAINT fk_price FOREIGN KEY(priceId) REFERENCES prices (id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY(categoryId) REFERENCES categories (id) ON DELETE CASCADE,
    CONSTRAINT fk_users FOREIGN KEY(userId) REFERENCES users (id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE tokens(
    userId int(11) NOT NULL,
    token varchar(255),
    expires_in DATE not null,
    CONSTRAINT fk_users_tokens FOREIGN KEY(userId) REFERENCES users (id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE messages(
	id int(11) auto_increment NOT NULL,
    sender int(11) NOT NULL,
    receiver int(11) NOT NULL,
    message MEDIUMTEXT NOT NULL,
    createdAt DATE NOT NULL,
    property int(11) NOT NULL,
    CONSTRAINT pk_messages PRIMARY KEY(id),
    constraint fk_sender FOREIGN KEY(sender) references users (id) ON delete cascade,
    constraint fk_receiver FOREIGN KEY(receiver) references users (id) ON delete cascade,
    constraint fk_property FOREIGN KEY(property) references properties (id) ON delete cascade
)ENGINE=InnoDB;