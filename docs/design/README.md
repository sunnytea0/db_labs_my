# Проєктування бази даних

В рамках проекту розробляється:

- модель бізнес-об'єктів
- ER-модель

@startuml

left to right direction

entity User {
    * id : INT
    --
    first_name : VARCHAR
    last_name : VARCHAR
    email : VARCHAR
    password : VARCHAR
    phone_number : VARCHAR
    age : INT
    is_admin : BOOLEAN
    role_id : INT
}

entity Role {
    * id : INT
    --
    name : VARCHAR
    description : TEXT
}

entity Permission {
    * id : INT
    --
    name : VARCHAR
    description : TEXT
}

entity RolePermission {
    * role_id : INT
    * permission_id : INT
}

entity Survey {
    * id : INT
    --
    owner_id : INT
    title : VARCHAR
    description : TEXT
    creation_date : DATETIME
    close_date : DATETIME
    is_active : BOOLEAN
}

entity Question {
    * id : INT
    --
    survey_id : INT
    description : TEXT
    header : VARCHAR
}

entity Option {
    * id : INT
    --
    question_id : INT
    description : TEXT
}

entity Answer {
    * id : INT
    --
    content : TEXT
    user_id : INT
    question_id : INT
    answer_id : INT
}

entity Results {
    * id : INT
    --
    content : TEXT
    name : VARCHAR
    answer_id : INT
}

entity Feedback {
    * id : INT
    --
    title : VARCHAR
    description : TEXT
    date : DATETIME
    user_id : INT
    survey_id : INT
}

User }o--|| Role : "has role"
Role ||--|{ RolePermission : "assigns"
Permission }|--|| RolePermission : "grants"

User ||--|{ Survey : "owns"
Survey ||--|{ Question : "contains"
Question ||--|{ Option : "has options"

User ||--|{ Answer : "provides"
Question ||--|{ Answer : "has answers"
Answer ||--|{ Results : "produces"

User ||--|{ Feedback : "writes"
Survey ||--|{ Feedback : "receives"

@enduml

- реляційна схема
