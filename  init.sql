GRANT ALL PRIVILEGES ON *.* TO 'eventio'@'%' IDENTIFIED BY 'eventio_pass';
FLUSH PRIVILEGES;

CREATE TABLE tasks (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    title varchar(100) NOT NULL,
    description varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;