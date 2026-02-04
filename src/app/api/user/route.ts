import { UserService } from "@/services/user.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  return Response.json(
    await UserService.listUsers({
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 10),
      search: searchParams.get("search") || undefined,
    })
  );
}
