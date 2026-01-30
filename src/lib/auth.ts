import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      id: payload.id as number,
      roleId: payload.roleId,
      name: payload.name
    };
  } catch {
    return null;
  }
}
