# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:

- SQL-скрипт для створення на початкового наповнення бази даних
- RESTfull сервіс для управління даними

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Answer (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    user_id UUID NOT NULL,
    question_id UUID NOT NULL,
    answer_id UUID,
    CONSTRAINT fk_answer_self FOREIGN KEY (answer_id) REFERENCES Answer(id) -- 
);

CREATE TABLE Result (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    answer_id UUID NOT NULL,
    CONSTRAINT fk_result_answer FOREIGN KEY (answer_id) REFERENCES Answer(id)
);


INSERT INTO Answer (content, user_id, question_id)
VALUES 
('The answer to life is 42.', 'd3e1b89e-23f5-4de1-a37d-5243f16f9b8c', 'aa2d1f4a-bc65-4e6e-bc63-f589ef2b1f1f'),
('The second possible answer is 24.', 'e6d3b15e-29c4-49ad-97d3-61ad1234ac9b', 'bb4c2d4b-bc65-4e6e-bc63-f589ef2b1f2g');


INSERT INTO Result (content, nameanswer_id)
VALUES ('User successfully answered the question.', 'First Attempt', 'the-uuid-of-the-answer-above');
('The second possible answer is 24.', 'e6d3b15e-29c4-49ad-97d3-61ad1234ac9b', 'bb4c2d4b-bc65-4e6e-bc63-f589ef2b1f2g'),
('A comment on the first answer.', 'f9b1d52e-8931-4cba-8a3d-243c4ed3b456', 'aa2d1f4a-bc65-4e6e-bc63-f589ef2b1f1f');