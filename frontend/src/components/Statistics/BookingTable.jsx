import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/Table';

export function BookingTable({ bookings }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đặt vé</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Hành trình</TableHead>
            <TableHead>Ngày</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Giá</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">#{booking.id}</TableCell>
              <TableCell>
                {booking.Passengers.map(
                  (p) => `${p.first_name} ${p.last_name}`
                ).join(', ')}
              </TableCell>
              <TableCell>
                {`${booking.outboundFlight.origin} → ${booking.outboundFlight.destination}`}
              </TableCell>
              <TableCell>
                {new Date(booking.departure_time).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    booking.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                ${booking.total_price.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
