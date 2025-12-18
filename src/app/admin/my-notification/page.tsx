"use client";

import { NotificationItem } from "@/app/admin/my-notification/NotificationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetNotification,
  useMarkOneAsRead,
} from "@/hooks/queries/useNotification";

export default function NotificationPage() {
  const { data: myNotification, isLoading } = useGetNotification({});
  const { mutate: markOneAsRead } = useMarkOneAsRead();

  if (isLoading) return null;

  return (
    <div className="w-[600px] mx-auto">
      <Card className="h-[600px] flex flex-col">
        {/* Header cố định */}
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>

        {/* Content cuộn */}
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          {!myNotification || myNotification.data.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-10">
              No notifications
            </p>
          ) : (
            myNotification.data.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={(id) => markOneAsRead({ id })}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
