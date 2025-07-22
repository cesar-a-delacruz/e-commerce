const devConfig = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
}

const prodConfig = {
  baseURL: 'Your production url',
}

export const config = devConfig
