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
