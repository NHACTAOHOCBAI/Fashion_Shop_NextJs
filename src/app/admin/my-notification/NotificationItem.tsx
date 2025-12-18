import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ShoppingCart, Percent } from "lucide-react";

interface Props {
  notification: Notification;
  onRead: (id: number) => void;
}

export function NotificationItem({ notification, onRead }: Props) {
  const Icon = notification.type === "ORDER" ? ShoppingCart : Percent;

  return (
    <div
      onClick={() => {
        if (!notification.isRead) {
          onRead(notification.id);
        }
      }}
      className={cn(
        "flex gap-4 rounded-lg border p-4 transition cursor-pointer",
        notification.isRead ? "opacity-70" : "bg-muted/40 hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5 text-primary mt-1" />

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{notification.title}</h4>

          {!notification.isRead && <Badge className="text-xs">New</Badge>}
        </div>

        <p className="text-sm text-muted-foreground">{notification.message}</p>

        <span className="text-xs text-muted-foreground">
          {notification.time}
        </span>
      </div>
    </div>
  );
}
