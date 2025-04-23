# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:

- SQL-скрипт для створення на початкового наповнення бази даних
- RESTfull сервіс для управління даними

# Feedback

```sql

-- -----------------------------------------------------
-- Table `DB_labs`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DB_labs`.`Feedback` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Feedback_User_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Feedback_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `DB_labs`.`User` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB;
`sсurvey_id` INT UNSIGNED NULL,

INDEX `fk_Feedback_Survey_idx` (`survey_id` ASC) VISIBLE,
CONSTRAINT `fk_Feedback_Survey`
  FOREIGN KEY (`survey_id`)
  REFERENCES `DB_labs`.`Survey` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE
