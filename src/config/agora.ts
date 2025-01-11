// Ensure environment variables are typed
interface AgoraConfig {
  appId: string;
}

// Validate environment variables at runtime
const validateConfig = (): AgoraConfig => {
  const appId = "aedc1ccb3a164a78a1fa3d722d0754ff" ;
  
  if (!appId) {
    throw new Error(
      'Invalid Agora App ID. Please add a valid VITE_AGORA_APP_ID to your .env file.\n' +
      'You can get an App ID by:\n' +
      '1. Signing up at https://www.agora.io\n' +
      '2. Creating a new project in the Agora Console\n' +
      '3. Copying the App ID to your .env file'
    );
  }

  return { appId };
};

export const agoraConfig = validateConfig();