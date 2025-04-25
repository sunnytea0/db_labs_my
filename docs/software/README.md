
# Реалізація інформаційного та програмного забезпечення

## SQL скрипти для ініціалізації та наповнення бази даних

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Quiz (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    close_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    owner_id UUID NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Question (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL,
    header VARCHAR(255),
    description TEXT,
    FOREIGN KEY (quiz_id) REFERENCES Quiz(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Type (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL,
    description TEXT,
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
);

INSERT INTO Quiz (title, description, creation_date, close_date, is_active, owner_id)
VALUES
    ('Customer Satisfaction Quiz', 'Quiz about customer satisfaction', '2025-04-20 10:00:00', '2025-04-30 23:59:59', TRUE, 'e7b3f5b4-8a63-4e2e-baad-5a8c5c5b1234'),
    ('Employee Feedback Quiz', 'Quiz to collect employee feedback', '2025-04-21 12:00:00', NULL, TRUE, '0e00b3e1-2c66-4f56-9332-9e20bfcdb812'),
    ('Website Usability Quiz', 'Quiz to evaluate website usability', '2025-04-22 14:00:00', '2025-05-01 20:00:00', FALSE, '7f6c9aee-681c-4f61-812d-dcd7edb7b029');

INSERT INTO Question (quiz_id, header, description)
VALUES
    ('827487ea-227a-4847-9bf7-e0ada468c87e', 'How satisfied are you?', 'Please rate your satisfaction from 1 to 5'),
    ('827487ea-227a-4847-9bf7-e0ada468c87e', 'Would you recommend us?', ''),
    ('827487ea-227a-4847-9bf7-e0ada468c87e', 'What could we improve?', 'Open-ended feedback welcome'),
    ('827487ea-227a-4847-9bf7-e0ada468c87e', 'How easy was it to use our product?', 'Rate from 1 (hard) to 5 (easy)'),
    ('827487ea-227a-4847-9bf7-e0ada468c87e', 'Did everything work as expected?', '');

INSERT INTO Type (question_id, description)
VALUES
  ('f1b5084c-3e9a-485d-92e4-9b4696c2f953', '1TO5RATING'),
  ('11a6f19f-612c-4562-acba-a4573decb6ef', 'YES/NO'),
  ('68d46927-04b7-4d88-bf3d-6cd2d61e0756', 'TEXT'),
  ('654d25da-b39f-4bf0-9731-4872b7c3b5b3', '1TO5RATING'),
  ('b7135385-ca55-458c-b3f7-8c56c6449117', 'YES/NO');
```

<!-- В рамках проекту розробляється:

- SQL-скрипт для створення на початкового наповнення бази даних
- RESTfull сервіс для управління даними -->
