const debugInfo = (req, res, next) => {
  const startTime = Date.now();

  const originalJson = res.json;

  res.json = function (data) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    let newData = {};
    let debugInfo = {};
    newData.data = data;
    debugInfo.responseTime = responseTime;
    debugInfo.params = req.params;
    debugInfo.HTTPmethod = req.method;
    debugInfo.endpoint = req.originalUrl;
    newData.debugInfo = debugInfo;

    originalJson.call(this, newData);
  };

  next();
};

export default debugInfo;
