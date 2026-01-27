export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export class CommonService {
  /**
   * Create standardized API response
   */
  static createResponse<T>(
    success: boolean,
    message: string,
    data?: T,
    error?: string
  ): ApiResponse<T> {
    return {
      success,
      message,
      data,
      error,
    };
  }

  /**
   * Create success response
   */
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return this.createResponse(true, message, data);
  }

  /**
   * Create error response
   */
  static error(message: string, error?: string): ApiResponse {
    return this.createResponse(false, message, undefined, error);
  }

  /**
   * Validate required fields
   */
  static validateRequired(data: Record<string, any>, requiredFields: string[]): string[] {
    const missing: string[] = [];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === '') {
        missing.push(field);
      }
    }
    
    return missing;
  }

  /**
   * Sanitize email
   */
  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Format date for display
   */
  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Calculate expiry time
   */
  static addMinutesToDate(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  /**
   * Check if date is expired
   */
  static isExpired(date: Date): boolean {
    return new Date() > date;
  }

  /**
   * Log with timestamp
   */
  static log(message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data || '');
  }

  /**
   * Log error with timestamp
   */
  static logError(message: string, error?: any): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error || '');
  }

  /**
   * Handle async errors
   */
  static async handleAsync<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'Operation failed'
  ): Promise<[T | null, Error | null]> {
    try {
      const result = await operation();
      return [result, null];
    } catch (error) {
      this.logError(errorMessage, error);
      return [null, error as Error];
    }
  }
}
