export function validateSettingsUpdate(body: any) {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const { notifications } = body;

  if (!notifications || typeof notifications !== "object") {
    throw new Error("Missing notifications settings");
  }

  const { emailNotifications, smsAlerts, events } = notifications;

  if (typeof emailNotifications !== "boolean") {
    throw new Error("emailNotifications must be boolean");
  }

  if (typeof smsAlerts !== "boolean") {
    throw new Error("smsAlerts must be boolean");
  }

  if (!events || typeof events !== "object") {
    throw new Error("events must be an object");
  }

  const allowedEvents = [
    "capitalCalls",
    "distributions",
    "documents",
    "kyc",
    "marketCommentary",
    "eventReminders",
  ];

  for (const key of allowedEvents) {
    if (typeof events[key] !== "boolean") {
      throw new Error(`events.${key} must be boolean`);
    }
  }

  return true;
}
