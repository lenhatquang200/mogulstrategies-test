const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_DOC_TYPES = ['passport', 'drivers', 'national'] as const;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_PDF_TYPE = 'application/pdf';

export type KycStep2ValidationResult = {
  fileType: 'image' | 'pdf';
};

export function validateKycStep2(
  documentType: string,
  file: File
): KycStep2ValidationResult {
  // document type
  if (!ALLOWED_DOC_TYPES.includes(documentType as any)) {
    throw new Error('Invalid document type');
  }

  // file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 10MB');
  }

  // file type
  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isPdf = file.type === ALLOWED_PDF_TYPE;

  if (!isImage && !isPdf) {
    throw new Error('Only JPG, PNG or PDF files are allowed');
  }

  // optional stricter rules
  if (documentType === 'passport' && !isImage && !isPdf) {
    throw new Error('Invalid passport file');
  }

  return {
    fileType: isPdf ? 'pdf' : 'image',
  };
}
