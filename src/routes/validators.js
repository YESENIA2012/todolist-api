const validateCreateTaskParams = (title, description, state) => {
  let errorFound = false;
  let invalidProperty = null;

  if (!title) {
    errorFound = true;
    invalidProperty = "title";
  } else if (!description) {
    errorFound = true;
    invalidProperty = "description";
  } else if (!state) {
    errorFound = true;
    invalidProperty = "state";
  }

  return {
    errorFound,
    invalidProperty,
  };
};

const validateData = (router) => {
  router.use((req, res, next) => {
    const { title, description, state } = req.body;
    const validateParams = validateCreateTaskParams(title, description, state);
    if (!validateParams.errorFound) {
      next();
    } else {
      res.status(400).json({
        error: `The ${validateParams.invalidProperty} is required to create the task`,
      });
    }
  });
};

export { validateData };
