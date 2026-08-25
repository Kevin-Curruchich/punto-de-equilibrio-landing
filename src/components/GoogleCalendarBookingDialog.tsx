import { X } from "lucide-react";

interface GoogleCalendarBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bookingUrl =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2hW0Itw47UUFANVuOa_PtoN49xTqzSs3e9Cjte_6wFKdRcWWN9QKSSWhRngEzIzI_Bqdi4uClD?gv=true";

export default function GoogleCalendarBookingDialog({
  open,
  onOpenChange,
}: GoogleCalendarBookingDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-k-text/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-dialog-title"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-k-line px-5 py-4">
          <h2
            id="booking-dialog-title"
            className="text-lg font-medium text-k-text"
          >
            Agenda tu cita
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-k-text-secondary transition-colors hover:bg-k-primary/10 hover:text-k-text"
            aria-label="Cerrar reserva"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <iframe
          src={bookingUrl}
          title="Reservar una cita en Google Calendar"
          className="block h-[600px] w-full border-0"
        />
      </div>
    </div>
  );
}
