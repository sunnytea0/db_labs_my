
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

INSERT INTO Quiz (title, description, creation_date, close_date, is_active, owner_id)
VALUES
('Customer Satisfaction Quiz', 'Quiz about customer satisfaction', '2025-04-20 10:00:00', '2025-04-30 23:59:59', TRUE, 'e7b3f5b4-8a63-4e2e-baad-5a8c5c5b1234'),
('Employee Feedback Quiz', 'Quiz to collect employee feedback', '2025-04-21 12:00:00', NULL, TRUE, '0e00b3e1-2c66-4f56-9332-9e20bfcdb812'),
('Website Usability Quiz', 'Quiz to evaluate website usability', '2025-04-22 14:00:00', '2025-05-01 20:00:00', FALSE, '7f6c9aee-681c-4f61-812d-dcd7edb7b029');

```



