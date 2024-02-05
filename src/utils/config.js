
const devConfig = {
    baseURL: process.env.NODE_ENV !== 'development' ? "https://favoriteshirts.azurewebsites.net" : "http://localhost:4000",
  };
  
  const prodConfig = {
    baseURL: "Your production url",
  };
  
  export const config = devConfig;
      