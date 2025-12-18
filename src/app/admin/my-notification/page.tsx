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
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {!myNotification || myNotification.data.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
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
