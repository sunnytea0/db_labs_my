
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
    FOREIGN KEY (owner_id) REFERENCES User(id) ON DELETE CASCADE
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

CREATE TABLE EventParticipant (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES "User"(id),
    event_id UUID NOT NULL REFERENCES WorkflowEvent(id)
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

INSERT INTO EventParticipant (role, user_id, event_id)
VALUES
  ('Reviewer', '359d3c13-30b6-4614-a54f-6d30bb5bd4ac', '20a8461b-03a6-4d4a-bd53-f33da214dbfc'),
  ('Submitter', '959d7ddf-12bb-4a3c-ae25-df4dbf60867e', 'c69418e5-38ae-4bc5-b6e8-ea98fc249aaf'),
  ('Observer', '959d7ddf-12bb-4a3c-ae25-df4dbf60867e', 'b5571635-803c-4fe0-95b1-382461510871');
```

<!-- В рамках проекту розробляється:

- SQL-скрипт для створення на початкового наповнення бази даних

- RESTfull сервіс для управління даними

=======
- RESTfull сервіс для управління даними -->



```sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------
-- Table "Feedback" з автогенерацією UUID
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "Feedback" (
  id PRIMARY KEY,
  description TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  user_id  NOT NULL,
  survey_id ,

  
  CONSTRAINT fk_feedback_user FOREIGN KEY (user_id)
    REFERENCES "User" (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_feedback_survey FOREIGN KEY (survey_id)
    REFERENCES "Survey" (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_feedback_user ON "Feedback" (user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_survey ON "Feedback" (survey_id);


INSERT INTO "Feedback" (content, date, user_id, survey_id)
VALUES ('This is some feedback content.', NOW(), 'dcd73fec-10fb-4bc5-8c01-938fa329af46', NULL);


