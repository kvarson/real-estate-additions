// Base Controller - Tüm controller'lar için temel sınıf

import { NextRequest, NextResponse } from 'next/server';

export abstract class BaseController {
     /**
      * Success response helper
      */
     protected success(
          data: unknown,
          message: string = 'Success',
          status: number = 200
     ) {
          return NextResponse.json(
               {
                    success: true,
                    message,
                    data,
               },
               { status }
          );
     }

     /**
      * Error response helper
      */
     protected error(
          message: string,
          status: number = 500,
          details?: Record<string, unknown>
     ) {
          return NextResponse.json(
               {
                    success: false,
                    message,
                    ...(details && { details }),
               },
               { status }
          );
     }

     /**
      * Validation error response helper
      */
     protected validationError(
          errors: unknown[],
          message: string = 'Validation failed'
     ) {
          return NextResponse.json(
               {
                    success: false,
                    message,
                    errors,
               },
               { status: 400 }
          );
     }

     /**
      * Not found response helper
      */
     protected notFound(message: string = 'Resource not found') {
          return NextResponse.json(
               {
                    success: false,
                    message,
               },
               { status: 404 }
          );
     }

     /**
      * Parse request body safely
      */
     protected async parseBody(request: NextRequest): Promise<unknown> {
          try {
               return await request.json();
          } catch (error) {
               throw new Error('Invalid JSON in request body');
          }
     }

     /**
      * Get query parameters
      */
     protected getQueryParams(request: NextRequest) {
          const { searchParams } = new URL(request.url);
          return Object.fromEntries(searchParams.entries());
     }
}
