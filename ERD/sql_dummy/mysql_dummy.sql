-- Insert data into the users table
INSERT INTO users (first_name, last_name, email, password, admin_authorization, user_authorization, address)
VALUES
    ('John', 'Doe', 'john@example.com', 'password123', true, False, '123 Main St'),
    ('Jane', 'Smith', 'jane@example.com', 'securepass', false, true, '456 Elm St'),
    ('Michael', 'Johnson', 'michael@example.com', 'pass123', true, false '789 Oak St'),
    ('Sarah', 'Brown', 'sarah@example.com', 'mysecret', false, true, '101 Maple St'),
    ('David', 'Wilson', 'david@example.com', 'secret123', true, false '202 Pine St');
    ('Au', 'Kim', 'kimau@example.com', '12345678', true, true 'HK');

-- Insert data into the tickets table
INSERT INTO tickets (requester_id, modules, subject, cs, priority, status, last_message)
VALUES
    (5, 'Module A', 'Issue 1', 'Customer support needed', 'High', 'Open', CURRENT_TIMESTAMP),
    (3, 'Module B', 'Issue 2', 'Technical question', 'Medium', 'In Progress', CURRENT_TIMESTAMP),
    (5, 'Module A', 'Issue 3', 'Billing inquiry', 'Low', 'Closed', CURRENT_TIMESTAMP),
    (1, 'Module C', 'Issue 4', 'Product feedback', 'High', 'Open', CURRENT_TIMESTAMP),
    (4, 'Module E', 'Issue 5', 'Product feedback', 'High', 'Open', CURRENT_TIMESTAMP),
    (1, 'Module F', 'Issue 6', 'Product feedback', 'High', 'Open', CURRENT_TIMESTAMP),
    (2, 'Module B', 'Issue 7', 'Technical issue', 'Medium', 'In Progress', CURRENT_TIMESTAMP);
-- INSERT DATA for different key
INSERT INTO tickets (requester_id, modules, subject, cs, priority, status, last_message)
VALUES
    (FLOOR(1 + RAND() * 5), 
     CASE
         WHEN FLOOR(RAND() * 3) = 0 THEN 'Booking'
         WHEN FLOOR(RAND() * 3) = 1 THEN 'Charging'
         ELSE 'Module C'
     END, 
     CASE
         WHEN FLOOR(RAND() * 9) = 0 THEN 'Issue 1'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 2'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 3'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 4'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 5'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 6'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 7'
         WHEN FLOOR(RAND() * 9) = 1 THEN 'Issue 8'
         ELSE 'Issue 9'
     END, 
     CASE
         WHEN FLOOR(RAND() * 5) = 0 THEN 'CS 1'
         WHEN FLOOR(RAND() * 5) = 1 THEN 'CS 2'
         WHEN FLOOR(RAND() * 5) = 1 THEN 'CS 3'
         WHEN FLOOR(RAND() * 5) = 1 THEN 'CS 4'
         ELSE 'CS 5'
     END, 
     CASE
         WHEN FLOOR(RAND() * 4) = 0 THEN 'Urgent'
         WHEN FLOOR(RAND() * 4) = 0 THEN 'High'
         WHEN FLOOR(RAND() * 4) = 1 THEN 'Medium'
         ELSE 'Low'
     END, 
     CASE
         WHEN FLOOR(RAND() * 6) = 0 THEN 'Open'
         WHEN FLOOR(RAND() * 6) = 1 THEN 'Processing'
         WHEN FLOOR(RAND() * 6) = 1 THEN 'Pending'
         WHEN FLOOR(RAND() * 6) = 1 THEN 'On Hold'
         WHEN FLOOR(RAND() * 6) = 1 THEN 'Solve'
         ELSE 'Closed'
     END, 
     CURRENT_TIMESTAMP);
-- update admin_authorization
-- UPDATE users
-- SET client_authorization = CASE WHEN admin_authorization = 1 THEN 0 ELSE 1 END;