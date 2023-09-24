const debugInfo = (req, res, next) => {
  const startTime = Date.now();

  const originalJson = res.json;

  res.json = function (data) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    let newData = {};
    newData.data = data;
    newData.responseTime = responseTime;
    newData.params = req.params;
    newData.HTTPmethod = req.method;
    newData.endpoint = req.originalUrl;

    originalJson.call(this, newData);
  };

  next();
};

export default debugInfo;
