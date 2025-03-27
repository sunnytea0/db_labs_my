---
title: Проєктування баз даних
outline: deep
---

# Проєктування баз даних

## Модель бізнес-об'єктів

**Модель бізнес-об'єктів** - це опис системи, в рамках якої відображаються всі об’єкти (сутності) даної системи. [[1]](https://economyandsociety.in.ua/journals/7_ukr/82.pdf)

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

@startuml

left to right direction

entity User #52f752
entity User.id #aaffaa
entity User.first_name #aaffaa
entity User.last_name #aaffaa
entity User.email #aaffaa
entity User.phone_number #aaffaa
entity User.password #aaffaa
entity User.age #aaffaa

User.id -d-* User
User.first_name -d-* User
User.last_name -d-* User
User.email -d-* User
User.phone_number -d-* User
User.password -d-* User
User.age -d-* User

entity Answer #f74564
entity Answer.id #FFC0CB
entity Answer.content #FFC0CB
entity Answer.user_id #FFC0CB
entity Answer.question_id #FFC0CB
entity Answer.answer_id #FFC0CB

Answer.id -d-* Answer
Answer.content -d-* Answer
Answer.user_id -d-* Answer
Answer.question_id -d-* Answer
Answer.answer_id -d-* Answer

entity Question #d147d1
entity Question.id #D8BFD8
entity Question.description #D8BFD8
entity Question.survey_id #D8BFD8
entity Question.header #D8BFD8

Question.id -d-* Question
Question.description -d-* Question
Question.survey_id -d-* Question
Question.header -d-* Question

entity Option #117d59
entity Option.id #1ee8a4
entity Option.description #1ee8a4
entity Option.question_id #1ee8a4

Option.id -d-* Option
Option.description -d-* Option
Option.question_id -d-* Option

entity Result #00ff61
entity Result.id #00ff61
entity Result.content #00ff61
entity Result.name #00ff61
entity Result.answer_id #00ff61

Result.id -d-* Result
Result.content -d-* Result
Result.name -d-* Result
Result.answer_id -d-* Result

entity Feedback #f59e51
entity Feedback.id #FFDAB9
entity Feedback.title #FFDAB9
entity Feedback.description #FFDAB9
entity Feedback.date #FFDAB9
entity Feedback.user_id #FFDAB9
entity Feedback.survey_id #FFDAB9

Feedback.id -d-* Feedback
Feedback.title -d-* Feedback
Feedback.description -d-* Feedback
Feedback.date -d-* Feedback
Feedback.user_id -d-* Feedback
Feedback.survey_id -d-* Feedback

entity Survey #06bfbf
entity Survey.id #9effff
entity Survey.owner_id #9effff
entity Survey.description #9effff
entity Survey.is_active #9effff
entity Survey.creation_date #9effff
entity Survey.close_date #9effff
entity Survey.title #9effff

Survey.id -d-* Survey
Survey.owner_id -d-* Survey
Survey.description -d-* Survey
Survey.is_active -d-* Survey
Survey.creation_date -d-* Survey
Survey.close_date -d-* Survey
Survey.title -d-* Survey

entity Role #0c56bd
entity Role.id #aaddff
entity Role.name #aaddff
entity Role.description #aaddff

Role.id -d-* Role
Role.name -d-* Role
Role.description -d-* Role

entity Permission #14f749
entity Permission.id #ccee88
entity Permission.name #ccee88
entity Permission.description #ccee88

Permission.id -d-* Permission
Permission.name -d-* Permission
Permission.description -d-* Permission

User -- Answer : user_id
User -- Feedback : user_id
User -- Survey : owner_id
Question -- Option : question_id
Question -- Answer : question_id
Option -- Answer : answer_id
Answer -- Result : answer_id
Survey -- Question : survey_id
Survey -- Feedback : survey_id
User -- Role
User -- Permission
Role.id -- Permission.id : RolePermission

@enduml

</center>

## ER-модель   

**ER-модель** описує сутності системи та визначає зв'язки між ними. [[2]](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

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

**Реляційна схема** - це набір таблиць, кожна з яких відповідає за одну з сутностей реляційної бази даних, та зв'язків між ними. Реляційна схема використовується для представлення реляційної бази даних. [[3]](https://www.sciencedirect.com/topics/computer-science/relational-schema#:~:text=A%20relational%20schema%20is%20a,applications%20belong%20to%20one%20schema.)

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

![Реляційна схема](..%2Fimg%2Frelational_schema.png)

</center>

## Посилання

1. [Бізнес-моделі підприємства: еволюція та класифікація](https://economyandsociety.in.ua/journals/7_ukr/82.pdf)
2. [Entity–relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
3. [Relational Schemas](https://www.sciencedirect.com/topics/computer-science/relational-schema#:~:text=A%20relational%20schema%20is%20a,applications%20belong%20to%20one%20schema.)
