export const safeExecute = async <T>(promise: Promise<T>) => {
  try {
    return [undefined, await promise];
  } catch (error) {
    return [error, undefined];
  }
};
