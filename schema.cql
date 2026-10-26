CREATE KEYSPACE IF NOT EXISTS todo_application_keyspace
WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

USE todo_application_keyspace;

CREATE TABLE IF NOT EXISTS todo_table (
    id uuid PRIMARY KEY,
    created_at timestamp,
    todo_description text,
    updated_at timestamp
);
