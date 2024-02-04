
console.log('wowowowowo')
console.log(process.env)

const devConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4000",
  };
  
  const prodConfig = {
    baseURL: "Your production url",
  };
  
  export const config = devConfig;
      