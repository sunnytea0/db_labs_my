---
title: Проєктування баз даних
outline: deep
---

# Проєктування баз даних  

## Модель бізнес-об'єктів  

Модель бізнес-об'єктів - це опис системи, в рамках якої відображаються всі об’єкти (сутності) даної системи. [[1]](https://economyandsociety.in.ua/journals/7_ukr/82.pdf)

## ER-модель   

ER-модель описує сутності системи та визначає зв'язки між ними. [[2]](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)

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

## Реляційна схема 

Реляційна схема - це набір таблиць, кожна з яких відповідає за одну з сутностей реляційної бази даних, та зв'язків між ними. Реляційна схема використовується для представлення реляційної бази даних. [[3]](https://www.sciencedirect.com/topics/computer-science/relational-schema#:~:text=A%20relational%20schema%20is%20a,applications%20belong%20to%20one%20schema.)
