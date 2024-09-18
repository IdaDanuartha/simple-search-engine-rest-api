import { Response } from 'express';

// Helper function for response formatting
export const sendResponse = (
  res: Response,
  success: boolean,
  data: any = null,
  message: string = '',
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
