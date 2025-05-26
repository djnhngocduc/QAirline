import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useToast } from '../../../hooks/useToast';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Label } from '../../../components/ui/Label';
import DatePicker from '../../../components/DatePicker';

const ManageBooking = () => {
  const [activeTab, setActiveTab] = useState('manage_booking');
  const [bookingCode, setBookingCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!bookingCode || !lastName || !birthDate) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền vào tất cả các ô.',
        variant: 'destructive',
      });
    } else {
      toast({
        title:
          activeTab === 'manage_booking'
            ? 'Đã tìm thấy đặt chỗ'
            : 'Làm thủ tục thành công',
        description:
          activeTab === 'manage_booking'
            ? `Thông tin đặt chỗ của ${lastName} với mã đặt chỗ ${bookingCode} đã được tìm thấy.`
            : `Đã hoàn tất thủ tục cho ${lastName} với mã đặt chỗ ${bookingCode}.`,
        variant: 'success',
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
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageBooking;
