export type GuestType = "default" | "friends";

const SCHEDULE_BY_GUEST: Record<GuestType, string> = {
  default: "10:00 - Selesai",
  friends: "13:00 - Selesai",
};

export function getGuestType(
  searchParams: Record<string, string | string[] | undefined>,
): GuestType {
  if (searchParams.f !== undefined) {
    return "friends";
  }

  return "default";
}

export function getScheduleTime(guestType: GuestType): string {
  return SCHEDULE_BY_GUEST[guestType];
}
