CREATE DATABASE portafolio;
USE portafolio;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE proyectos(
	id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100),
	descripcion VARCHAR(500),
	imagen VARCHAR(300),
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) references users(id)
);