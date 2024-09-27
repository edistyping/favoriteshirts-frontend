
const devConfig = {
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5167" : "https://dotnet-favoriteshirts.azurewebsites.net",
};
  
const prodConfig = {
  baseURL: "Your production url",
};
  
export const config = devConfig;
      