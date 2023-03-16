export const errorMessages = {
  requiredField: 'Required field!',
  invalidType: 'Invalid type!',
  incorrectLength: (field: string, min: number, max: number) => `${field} should be from ${min} to ${max} characters`,
}
