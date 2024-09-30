export const addTraceId = (req, res, next) => {
  req.headers.traceId = Math.random().toString(36).substring(2);
  next();
}