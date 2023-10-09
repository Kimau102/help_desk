CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    admin_authorization BOOLEAN NOT NULL,
    address TEXT NOT NULL,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    requester_id BIGINT NOT NULL,
    modules TEXT NOT NULL,
    subject TEXT NOT NULL,
    cs TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,
    last_message TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES users(id)
);

--for phpmyadmin
-- CREATE TABLE tickets (
--     id BIGINT AUTO_INCREMENT PRIMARY KEY,
--     requester_id BIGINT NOT NULL,
--     modules TEXT NOT NULL,
--     subject TEXT NOT NULL,
--     cs TEXT NOT NULL,
--     priority TEXT NOT NULL,
--     status TEXT NOT NULL,
--     last_message TIMESTAMP NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );