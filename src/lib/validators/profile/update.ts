const ALLOWED_FIELDS = ["name", "phone", "timezone", "email"] as const;
type AllowedField = typeof ALLOWED_FIELDS[number];

const ALLOWED_TIMEZONES = ["EST", "PST", "GMT"] as const;

// chỉ cho số + ký tự phổ biến
const isPhoneValid = (v: string) =>
  /^[0-9+\-\s()]{7,20}$/.test(v);

export type ProfileUpdateResult = Partial<{
  name: string;
  phone: string;
  timezone: string;
}>;

export function validateProfileUpdate(
  body: Record<string, any>
): ProfileUpdateResult {
  const payload: ProfileUpdateResult = {};

  // ===== 1. WHITELIST FIELD =====
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.includes(key as AllowedField)) {
      throw new Error(`Field '${key}' is not allowed`);
    }
  }

  // ===== 2. NAME =====
  if (body.name !== undefined) {
    if (typeof body.name !== "string") {
      throw new Error("Name must be a string");
    }

    const name = body.name.trim();

    if (name.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }

    if (name.length > 50) {
      throw new Error(`Name is too long (max ${50} characters)`);
    }

    payload.name = name;
  }

  // ===== 3. PHONE (OPTIONAL) =====
  if (body.phone !== undefined) {
    if (typeof body.phone !== "string") {
      throw new Error("Phone must be a string");
    }

    const phone = body.phone.trim();

    if (phone !== "") {
      if (!isPhoneValid(phone)) {
        throw new Error("Invalid phone number");
      }
      payload.phone = phone;
    }
  }

  // ===== 4. TIMEZONE =====
  if (body.timezone !== undefined) {
    if (typeof body.timezone !== "string") {
      throw new Error("Timezone must be a string");
    }

    if (!ALLOWED_TIMEZONES.includes(body.timezone as any)) {
      throw new Error("Invalid timezone");
    }

    payload.timezone = body.timezone;
  }

  // ===== 5. EMAIL =====
  // => intentionally ignored

  // ===== 6. EMPTY PAYLOAD =====
  if (Object.keys(payload).length === 0) {
    throw new Error("No valid data to update");
  }

  return payload;
}
