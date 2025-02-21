export const generateDeepLink = (name: string) => {
  const appScheme = "your-app://";
  const webUrl =
    process.env.NEXT_PUBLIC_APP_DOMAIN || "https://brokage.vercel.app";

  return {
    deepLink: `${appScheme}${name}`,
    webLink: `${webUrl}/${name}`, 
  };
};
