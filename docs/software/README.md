# Реалізація інформаційного та програмного забезпечення

## **SQL скрипти для ініціалізації та наповнення бази даних**

```sql
CREATE TABLE IF NOT EXISTS "WorkflowEvent" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    user_id UUID REFERENCES "User"(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES "Quiz"(id) ON DELETE CASCADE
);

INSERT INTO "WorkflowEvent" (created_at, description, user_id, quiz_id)
VALUES
    (
        NOW(),
        'Quiz initialized by the user',
        (SELECT id FROM "User" WHERE email = 'olena@example.com'),
        (SELECT id FROM "Quiz" WHERE title = 'Java Basics')
    ),
    (
        NOW(),
        'User is answering the questions',
        (SELECT id FROM "User" WHERE email = 'ivan@example.com'),
        (SELECT id FROM "Quiz" WHERE title = 'SQL Starter')
    ),
    (
        NOW(),
        'Quiz completed and submitted',
        (SELECT id FROM "User" WHERE email = 'marta@example.com'),
        (SELECT id FROM "Quiz" WHERE title = 'Java Basics')
    );
```
