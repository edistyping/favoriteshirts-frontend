
const devConfig = {
    baseURL: process.env.NODE_ENV !== 'development' ? "http://localhost:5167" : "http://localhost:5167",
  };
  
  const prodConfig = {
    baseURL: "Your production url",
  };
  
  export const config = devConfig;
      