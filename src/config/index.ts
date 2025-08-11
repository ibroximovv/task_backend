import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export type ConfigType = {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  API_BASE_URL: string;
};

const requiredVariables = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'API_BASE_URL'];

const missingVariables = requiredVariables.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  Logger.error(
    `Missing or empty required environment variables: ${missingVariables.join(
      ', ',
    )}`,
  );
  process.exit(1);
}

export const config: ConfigType = {
  PORT: parseInt(process.env.PORT as string, 10),
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
};