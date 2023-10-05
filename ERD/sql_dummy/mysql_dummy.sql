-- Insert data into the users table
INSERT INTO users (first_name, last_name, email, password, admin_authorization, address)
VALUES
    ('John', 'Doe', 'john@example.com', 'password123', true, '123 Main St'),
    ('Jane', 'Smith', 'jane@example.com', 'securepass', false, '456 Elm St'),
    ('Michael', 'Johnson', 'michael@example.com', 'pass123', true, '789 Oak St'),
    ('Sarah', 'Brown', 'sarah@example.com', 'mysecret', false, '101 Maple St'),
    ('David', 'Wilson', 'david@example.com', 'secret123', true, '202 Pine St');

-- Insert data into the tickets table
INSERT INTO tickets (requester_id, modules, subject, cs, priority, status, last_message)
VALUES
    (1, 'Module A', 'Issue 1', 'Customer support needed', 'High', 'Open', CURRENT_TIMESTAMP),
    (2, 'Module B', 'Issue 2', 'Technical question', 'Medium', 'In Progress', CURRENT_TIMESTAMP),
    (3, 'Module A', 'Issue 3', 'Billing inquiry', 'Low', 'Closed', CURRENT_TIMESTAMP),
    (4, 'Module C', 'Issue 4', 'Product feedback', 'High', 'Open', CURRENT_TIMESTAMP),
    (5, 'Module B', 'Issue 5', 'Technical issue', 'Medium', 'In Progress', CURRENT_TIMESTAMP);