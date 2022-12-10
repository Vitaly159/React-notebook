import { body } from "express-validator";

export const registerValidations = [
  body("email", "Введите E-Mail").isEmail().withMessage("Недопустимый E-Mail"),
  body("firstname", "Введите имя")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage("Допустимое количество символов имени то 2 до 40"),
  body("secondname", "Введите фамилию")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage("Допустимое количество символов фамилии то 2 до 40"),
  body("password", "Укажите пароль")
    .isString() 
    .isLength({
      min: 6,
      max: 40,
    })
    .withMessage("Пароль должен быть минимум 6 символов")
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Пароли не совпадают");
      } else {
        return value;
      }
    })
];
