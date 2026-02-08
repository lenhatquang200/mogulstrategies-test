type KycStep1Payload = {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  nationality: string;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
};

type ValidationResult =
  | { valid: true }
  | {
      valid: false;
      field: keyof KycStep1Payload | "form";
      message: string;
    };


const isTooLong = (v: string, max: number) => v.length > max;
const hasHTML = (v: string) => /[<>]/.test(v);
const isNameValid = (v: string) => /^[a-zA-Z\s'-]+$/.test(v);
const isPhoneValid = (v: string) => /^[0-9+\-\s()]{7,20}$/.test(v);

const MIN_AGE = 16;
const MAX_AGE = 100;

export function validateKycStep1(
  body: Partial<KycStep1Payload>
): ValidationResult {
  const {
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    nationality,
    country,
    address,
    city,
    state,
    postalCode,
    phone,
  } = body;

  // ===== REQUIRED CHECK =====
  if (!firstName)
    return { valid: false, field: "firstName", message: "First name is required" };

  if (!lastName)
    return { valid: false, field: "lastName", message: "Last name is required" };

  if (!dateOfBirth)
    return { valid: false, field: "dateOfBirth", message: "Date of birth is required" };

  if (!nationality)
    return { valid: false, field: "nationality", message: "Nationality is required" };

  if (!country)
    return { valid: false, field: "country", message: "Country is required" };

  if (!address)
    return { valid: false, field: "address", message: "Address is required" };

  if (!city)
    return { valid: false, field: "city", message: "City is required" };

  if (!state)
    return { valid: false, field: "state", message: "State is required" };

  if (!postalCode)
    return { valid: false, field: "postalCode", message: "Postal code is required" };

  if (!phone)
    return { valid: false, field: "phone", message: "Phone is required" };

  // ===== NAME =====
  if (isTooLong(firstName, 50))
    return { valid: false, field: "firstName", message: "First name is too long (max 50 chars)" };

  if (!isNameValid(firstName))
    return { valid: false, field: "firstName", message: "First name contains invalid characters" };

  if (isTooLong(lastName, 50))
    return { valid: false, field: "lastName", message: "Last name is too long (max 50 chars)" };

  if (!isNameValid(lastName))
    return { valid: false, field: "lastName", message: "Last name contains invalid characters" };

  if (middleName && isTooLong(middleName, 50))
    return { valid: false, field: "middleName", message: "Middle name is too long" };

  // ===== DATE =====
  const dob = new Date(dateOfBirth);

  if (isNaN(dob.getTime())) {
    return { valid: false, field: "dateOfBirth", message: "Invalid date of birth" };
  }

  const today = new Date();
  if (dob > today) {
    return {
      valid: false,
      field: "dateOfBirth",
      message: "Date of birth cannot be in the future",
    };
  }

  // Calculate age
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < MIN_AGE) {
    return {
      valid: false,
      field: "dateOfBirth",
      message: `You must be at least ${MIN_AGE} years old`,
    };
  }

  if (age > MAX_AGE) {
    return {
      valid: false,
      field: "dateOfBirth",
      message: "Invalid date of birth",
    };
  }


  // ===== ADDRESS =====
  if (isTooLong(address, 255) || hasHTML(address))
    return { valid: false, field: "address", message: "Invalid address" };

  if (isTooLong(city, 100) || hasHTML(city))
    return { valid: false, field: "city", message: "Invalid city" };

  if (isTooLong(state, 100) || hasHTML(state))
    return { valid: false, field: "state", message: "Invalid state" };

  if (isTooLong(postalCode, 20))
    return { valid: false, field: "postalCode", message: "Invalid postal code" };

  // ===== PHONE =====
  if (!isPhoneValid(phone))
    return { valid: false, field: "phone", message: "Invalid phone number" };

  return { valid: true };
}
