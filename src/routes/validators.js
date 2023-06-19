import Joi from "joi";

const createTaskSchema = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  state: Joi.string().required().label("State"),
});

const validateData = (req, res, next) => {
  const { error } = createTaskSchema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    res.status(400).json({
      error: errorMessage,
    });
  }
};

export { validateData };
