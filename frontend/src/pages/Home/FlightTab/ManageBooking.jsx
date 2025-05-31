import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import DatePicker from '../../../components/DatePicker';
import AlertDialog from '../../../components/Notification/AlertDialog';

const ManageBooking = () => {
  const [activeTab, setActiveTab] = useState('manage_booking');
  const [bookingCode, setBookingCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
    onClose: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingCode || !lastName || !birthDate) {
      setAlert({
        open: true,
        title: 'QAirline',
        message: `Vui lòng điền vào tất cả các ô`,
        isSuccess: false,
      });
    } else {
      setAlert({
        open: true,
        title: activeTab === 'manage_booking'
            ? 'Đã tìm thấy đặt chỗ'
            : 'Làm thủ tục thành công',
        message: activeTab === 'manage_booking'
            ? `Thông tin đặt chỗ của ${lastName} với mã đặt chỗ ${bookingCode} đã được tìm thấy.`
            : `Đã hoàn tất thủ tục cho ${lastName} với mã đặt chỗ ${bookingCode}.`,
        isSuccess: true,
      });
    }
  };

  return (
    <Card className="rounded-lg bg-white p-0 shadow-md">
      <CardHeader className="border-b">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('manage_booking')}
            className={`flex-1 py-1 text-center text-lg font-medium ${
              activeTab === 'manage_booking'
                ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:text-[#ff4d4d] hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
            }`}
          >
            Quản lý đặt chỗ
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 py-2 text-center text-lg font-medium ${
              activeTab === 'checkin'
                ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:text-[#ff4d4d] hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
            }`}
          >
            Làm thủ tục
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4 pt-4 md:flex-row md:gap-6">
          {/* Booking Reference */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="bookingCode">Mã đặt chỗ</Label>
            <Input
              id="bookingCode"
              placeholder="Nhập mã đặt chỗ"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Last Name */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="lastName">Họ</Label>
            <Input
              id="lastName"
              placeholder="Nhập họ"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date of Birth */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="birthDate">Ngày sinh</Label>
            <DatePicker
              id="birthDate"
              date={birthDate}
              setDate={setBirthDate}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-5 w-full md:w-auto">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-[#ff4d4d] py-3 text-white hover:bg-[#c84c4c] md:w-auto"
            >
              {activeTab === 'manage_booking' ? 'Tra cứu đặt chỗ' : 'Làm thủ tục'}
            </Button>
            <AlertDialog
              open={alert.open}
              onClose={() => {
                if (alert.onClose) {
                  alert.onClose();
                }
                setAlert({ ...alert, open: false });
              }}
              title={alert.title}
              message={alert.message}
              isSuccess={alert.isSuccess}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageBooking;
