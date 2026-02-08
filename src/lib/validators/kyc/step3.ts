const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_PDF_TYPE = 'application/pdf';

export type KycStep3ValidationResult = {
  fileType?: 'image' | 'pdf';
};

type Step3Payload = {
  entityType: string | null;
  individualCriteria: string | null;
  entityName: string | null;
  entityLegalType: string | null;
  formationDate: Date | null;
  jurisdiction: string | null;
  totalAssets: string | null;
  file: File | null;
};

export function validateKycStep3(
  payload: Step3Payload,
  hasExistingDocument: boolean
): KycStep3ValidationResult {
  const {
    entityType,
    individualCriteria,
    entityName,
    formationDate,
    jurisdiction,
    totalAssets,
    file,
  } = payload;

  // ===== entity type =====
  if (!entityType) {
    throw new Error('Entity type is required');
  }

  // ===== individual =====
  if (entityType === 'individual') {
    if (!individualCriteria) {
      throw new Error('Individual accreditation criteria is required');
    }
  }

  // ===== entity =====
  if (entityType !== 'individual') {
    if (!entityName) {
      throw new Error('Entity name is required');
    }

    if (!formationDate) {
      throw new Error('Formation date is required');
    }

    if (!jurisdiction) {
      throw new Error('Jurisdiction is required');
    }

    if (!totalAssets) {
      throw new Error('Total assets is required');
    }
  }

  // ===== file required =====
  if (!file && !hasExistingDocument) {
    throw new Error('Supporting document is required');
  }

  // ===== file validation =====
  if (file) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isPdf = file.type === ALLOWED_PDF_TYPE;

    if (!isImage && !isPdf) {
      throw new Error('Only JPG, PNG or PDF files are allowed');
    }

    return {
      fileType: isPdf ? 'pdf' : 'image',
    };
  }

  return {};
}
