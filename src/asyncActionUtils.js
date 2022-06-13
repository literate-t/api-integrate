export const createAsyncDispatcher = (type, promiseFn) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  const actionHandler = async (dispatch, rest) => {
    dispatch({ type });
    try {
      const data = await promiseFn(rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      });
    }
  };

  return actionHandler;
};
