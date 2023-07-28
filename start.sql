CREATE DATABASE IF NOT EXISTS notes;

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL,
    UNIQUE (tag_name)
);

CREATE TABLE IF NOT EXISTS note_tags (
    note_id INT,
    tag_id INT,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

INSERT INTO tags (tag_name) VALUES ('work'), ('personal'), ('important'), ('urgent'), ('fun');

INSERT INTO notes (title, content) VALUES ('My first note', 'This is my first note!'), ('My second note', 'This is my second note!');

INSERT INTO note_tags (note_id, tag_id) VALUES (1, 1), (1, 2), (1, 3), (2, 2), (2, 4);
```
