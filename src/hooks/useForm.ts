// Custom hook for form management with validation

import { useState, useCallback } from 'react';
import { FormState, ValidationError } from '@/types';

type ValidationRule<T> = {
     [K in keyof T]?: (value: T[K]) => string | null;
};

export function useForm<T extends Record<string, unknown>>(
     initialValues: T,
     validationRules?: ValidationRule<T>
) {
     const [formState, setFormState] = useState<FormState<T>>({
          values: initialValues,
          errors: [],
          isSubmitting: false,
          isValid: true,
     });

     const validateField = useCallback(
          (field: keyof T, value: unknown): string | null => {
               if (!validationRules || !validationRules[field]) return null;
               return validationRules[field]!(value as T[keyof T]);
          },
          [validationRules]
     );

     const validateForm = useCallback((): ValidationError[] => {
          const errors: ValidationError[] = [];

          if (validationRules) {
               Object.keys(validationRules).forEach((field) => {
                    const error = validateField(field, formState.values[field]);
                    if (error) {
                         errors.push({ field, message: error });
                    }
               });
          }

          return errors;
     }, [formState.values, validateField, validationRules]);

     const setValue = useCallback(
          (field: keyof T, value: unknown) => {
               setFormState((prev) => {
                    const newValues = { ...prev.values, [field]: value };
                    const fieldError = validateField(field, value);

                    // Remove existing error for this field
                    const filteredErrors = prev.errors.filter(
                         (err) => err.field !== field
                    );

                    // Add new error if exists
                    const newErrors = fieldError
                         ? [
                                ...filteredErrors,
                                { field: field as string, message: fieldError },
                           ]
                         : filteredErrors;

                    return {
                         ...prev,
                         values: newValues,
                         errors: newErrors,
                         isValid: newErrors.length === 0,
                    };
               });
          },
          [validateField]
     );

     const setErrors = useCallback((errors: ValidationError[]) => {
          setFormState((prev) => ({
               ...prev,
               errors,
               isValid: errors.length === 0,
          }));
     }, []);

     const reset = useCallback(() => {
          setFormState({
               values: initialValues,
               errors: [],
               isSubmitting: false,
               isValid: true,
          });
     }, [initialValues]);

     const handleSubmit = useCallback(
          async (onSubmit: (values: T) => Promise<void>) => {
               const errors = validateForm();

               if (errors.length > 0) {
                    setFormState((prev) => ({
                         ...prev,
                         errors,
                         isValid: false,
                    }));
                    return;
               }

               setFormState((prev) => ({ ...prev, isSubmitting: true }));

               try {
                    await onSubmit(formState.values);
               } catch (error) {
                    console.error('Form submission error:', error);
               } finally {
                    setFormState((prev) => ({ ...prev, isSubmitting: false }));
               }
          },
          [formState.values, validateForm]
     );

     const getFieldError = useCallback(
          (field: keyof T): string | undefined => {
               return formState.errors.find((err) => err.field === field)
                    ?.message;
          },
          [formState.errors]
     );

     return {
          values: formState.values,
          errors: formState.errors,
          isSubmitting: formState.isSubmitting,
          isValid: formState.isValid,
          setValue,
          setErrors,
          reset,
          handleSubmit,
          getFieldError,
     };
}
