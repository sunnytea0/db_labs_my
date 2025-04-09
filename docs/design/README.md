---
title: Проєктування баз даних
outline: deep
---

# Проєктування баз даних

## Модель бізнес-об'єктів  

**Модель бізнес-об'єктів** - це опис системи, в рамках якої відображаються всі об’єкти (сутності) даної системи. [[1]](https://economyandsociety.in.ua/journals/7_ukr/82.pdf)

## ER-модель   

**ER-модель** описує сутності системи та визначає зв'язки між ними. [[2]](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

@startuml
left to right direction
skinparam linetype polyline
skinparam nodesep 80
skinparam ranksep 80

entity EventParticipant {
    * id : UUID
    --
    role : TEXT
}

entity WorkflowEvent {
    * id : UUID
    --
    datetime : DATETIME
    state : TEXT
    description : TEXT
}

entity User {
    * id : UUID
    --
    first_name : VARCHAR
    last_name : VARCHAR
    email : VARCHAR
    password : VARCHAR
    phone_number : VARCHAR
    age : SMALLINT
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

entity Quiz {
    * id : UUID
    --
    title : VARCHAR
    description : TEXT
    creation_date : DATETIME
    close_date : DATETIME
    is_active : BOOLEAN
    owner_id : UUID
}

entity Feedback {
    * id : UUID
    --
    title : VARCHAR
    description : TEXT
    date : DATETIME
    user_id : UUID
    quiz_id : UUID
}

entity Question {
    * id : UUID
    --
    quiz_id : UUID
    header : VARCHAR
    description : TEXT
}

entity Type {
    * id : UUID
    --
    question_id : UUID
    description : TEXT
}

entity Variant {
    * id : UUID
    --
    text : TEXT
}

entity SelectedVar {
    * id : UUID
    --
}

entity Answer {
    * id : UUID
    --
    content : TEXT
    user_id : UUID
    question_id : UUID
    answer_id : UUID
}

entity Result {
    * id : UUID
    --
    content : TEXT
    name : VARCHAR
    answer_id : UUID
}

EventParticipant "0..*" --> "1.1" WorkflowEvent
EventParticipant "0..*" --> "1.1" User

WorkflowEvent "0..*" --> "1.1" User
WorkflowEvent "1.1" -- "1.1" Quiz

User "1.1" --> "0..*" Role
User "1.1" -- "0.*" Feedback

Permission "0..*" -- "1.1" User
Role "1.1" --> "0..*" Permission

Quiz "1.1" -- "0..*" Feedback
Quiz "0..*" --> "1.1" User

Question "0.*" --> "1.1" Quiz  
Question "0..*" --> "1.1" Type

Variant "0.*" --> "1.1" Question
Variant "1.1" <--> "0.*" SelectedVar

Answer "0.*" --> "1.1" User
Answer "0.*" --> "1.1" Question
Answer "0..1" <--> "0.*" SelectedVar

Result "1.1" -- "0.*" Answer

@enduml

</center>

## Реляційна схема 

**Реляційна схема** - це набір таблиць, кожна з яких відповідає за одну з сутностей реляційної бази даних, та зв'язків між ними. Реляційна схема використовується для представлення реляційної бази даних. [[3]](https://www.sciencedirect.com/topics/computer-science/relational-schema#:~:text=A%20relational%20schema%20is%20a,applications%20belong%20to%20one%20schema.)

## Посилання  

1. [Бізнес-моделі підприємства: еволюція та класифікація](https://economyandsociety.in.ua/journals/7_ukr/82.pdf)
2. [Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
3. [Relational Schemas](https://www.sciencedirect.com/topics/computer-science/relational-schema#:~:text=A%20relational%20schema%20is%20a,applications%20belong%20to%20one%20schema.)
