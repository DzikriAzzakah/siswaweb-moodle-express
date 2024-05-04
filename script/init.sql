CREATE DATABASE IF NOT EXISTS school;

USE school;

CREATE TABLE IF NOT EXISTS users(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	deleted_at timestamp NULL
);

INSERT INTO users (username,password) VALUES ('admin_super', '$2b$10$4A8Zf3WYQq9dCROp2cHlvOar.KGhPQA2PaDwUdU8/UOnVFjptugUi');