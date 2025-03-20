# Проєктування бази даних

В рамках проекту розробляється:

- модель бізнес-об'єктів
- ER-модель

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

@startuml

left to right direction

entity User {
    * id : UUID
    --
    first_name : VARCHAR
    last_name : VARCHAR
    email : VARCHAR
    password : VARCHAR
    phone_number : VARCHAR
    age : SMALLINT
    role_id : UUID
}

entity Role {
    * id : UUID
    --
    name : VARCHAR
    description : TEXT
}

entity Permission {
    * id : UUID
    --
    name : VARCHAR
    description : TEXT
}

entity RolePermission {
    * role_id : UUID
    * permission_id : UUID
}

entity Survey {
    * id : UUID
    --
    owner_id : UUID
    title : VARCHAR
    description : TEXT
    creation_date : DATETIME
    close_date : DATETIME
    is_active : BOOLEAN
}

entity Question {
    * id : UUID
    --
    survey_id : UUID
    description : TEXT
    header : VARCHAR
}

entity Option {
    * id : UUID
    --
    question_id : UUID
    description : TEXT
}

entity Answer {
    * id : UUID
    --
    content : TEXT
    user_id : UUID
    question_id : UUID
    answer_id : UUID
}

entity Results {
    * id : UUID
    --
    content : TEXT
    name : VARCHAR
    answer_id : UUID
}

entity Feedback {
    * id : UUID
    --
    title : VARCHAR
    description : TEXT
    date : DATETIME
    user_id : UUID
    survey_id : UUID
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


</center>

- реляційна схема
