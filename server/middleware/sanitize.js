export function sanitizeBodyAndParams(req, res, next) {
  const scrub = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const k of Object.keys(obj)) {
      if (k.startsWith('$') || k.includes('.')) delete obj[k];
      else if (typeof obj[k] === 'object') scrub(obj[k]);
    }
  };
  scrub(req.body);
  scrub(req.params);
  next();
}
