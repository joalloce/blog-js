// Custom middleware function to add response info
const debugInfo = (req, res, next) => {
  const startTime = Date.now();

  // Capture the original res.json function to modify the response
  const originalJson = res.json;

  // Override res.json to add custom response info
  res.json = function (data) {
    // Calculate the response time
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Add custom info to the JSON response
    data.responseTime = responseTime;
    data.params = req.params;
    data.endpoint = req.originalUrl;

    // Call the original res.json function with the modified data
    originalJson.call(this, data);
  };

  // Continue to the next middleware or route handler
  next();
};

export default debugInfo;
