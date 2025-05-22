import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/RadioGroup';
import DatePicker from '../../../components/DatePicker';

const StopOver = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [activeTab, setActiveTab] = useState('stopover');
  const [tripType, setTripType] = useState('round-trip');
  const [isOpen, setIsOpen] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [departure, setDeparture] = useState('');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy',
    rooms: 1,
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]:
        operation === 'increase' ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  const handleClassChange = (value) => {
    setPassengers((prev) => ({ ...prev, class: value }));
  };

  const handleRoomChange = (operation) => {
    setPassengers((prev) => ({
      ...prev,
      rooms:
        operation === 'increase' ? prev.rooms + 1 : Math.max(prev.rooms - 1, 1),
    }));
  };

  return (
    <Card className="rounded-lg bg-white p-0 shadow-md">
      {/* Tabs điều hướng */}
      <CardHeader className="border-b">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('stopover')}
            className={`flex-1 py-1 text-center text-lg font-medium ${
              activeTab === 'stopover'
                ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:bg-transparent hover:text-[#ff4d4d]'
                : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
            }`}
          >
            Quá cảnh
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('flights-hotel')}
            className={`flex-1 py-1 text-center text-lg font-medium ${
              activeTab === 'flights-hotel'
                ? 'rounded-none border-b-2 border-[#ff4d4d] text-[#ff4d4d] hover:text-[#ff4d4d] hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-[#ff4d4d]'
            }`}
          >
            Vé máy bay + Khách sạn
          </Button>
        </div>
      </CardHeader>

      {/* Nội dung tab */}
      <CardContent className="w-full rounded-lg bg-white p-6 shadow-md">
        {activeTab === 'stopover' && (
          <div className="space-y-4">
            {/* Trip Type */}
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setTripType(value)}
              className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="round-trip"
                  id="round-trip"
                  className="text-[#c84c4c]"
                />
                <Label htmlFor="round-trip" className="text-lg font-medium">
                  Khứ hồi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="one-way"
                  id="one-way"
                  className="text-[#c84c4c]"
                />
                <Label htmlFor="one-way" className="text-lg font-medium">
                 Một chiều
                </Label>
              </div>
            </RadioGroup>

            {/* From, To, Departure Date, Return Date */}
            <div className="col-span-1 flex flex-col items-center md:col-span-2 md:flex-row">
              <div className="relative w-full">
                <Label
                  htmlFor="from"
                  className="mb-1 block text-sm text-gray-600"
                >
                  Từ
                </Label>
                <Input
                  id="from"
                  placeholder="Chọn điểm khởi hành"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              {/* Switch Arrow */}
              <span
                className="mx-0 mt-2 cursor-pointer text-gray-400 hover:text-gray-600 md:mx-4 md:mt-6"
                onClick={() => {
                  // Swap From and To values
                  setFrom(to);
                  setTo(from);
                }}
              >
                ⇄
              </span>

              {/* To */}
              <div className="relative w-full">
                <Label
                  htmlFor="to"
                  className="mb-1 block text-sm text-gray-600"
                >
                  Đến
                </Label>
                <Input
                  id="to"
                  placeholder="Chọn điểm đến"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="relative w-full md:px-4">
                <Label htmlFor="departure">Khởi hành</Label>
                <DatePicker
                  id="departure"
                  date={departure}
                  setDate={setDeparture}
                />
              </div>
              {tripType === 'round-trip' && (
                <div className="relative w-full">
                  <Label htmlFor="return">Trở về</Label>
                  <DatePicker
                    id="return"
                    date={returnDate}
                    setDate={setReturnDate}
                  />
                </div>
              )}
            </div>

            {/* Passengers and Class */}
            <div className="mt-4 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div className="relative w-full max-w-xs">
                <Button
                  onClick={toggleDropdown}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-left text-gray-700
                  hover:bg-[#ff4d4d]"
                >
                  {`${passengers.adults + passengers.children + passengers.infants} Hành khách${
                    passengers.adults +
                      passengers.children +
                      passengers.infants >
                    1
                      ? ''
                      : ''
                  } hạng ${passengers.class === 'economy' ? 'phổ thông' : 'cao cấp'} | ${passengers.rooms} Phòng`}
                </Button>

                {isOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                    {/* Passengers Section */}
                    <div className="space-y-4 p-4">
                      <Label className="text-sm font-medium">Hành khách</Label>

                      {[
                        { label: 'Người lớn', type: 'adults', age: '12+ tuổi' },
                        { label: 'Trẻ em', type: 'children', age: '2-11 tuổi' },
                        {
                          label: 'Em bé',
                          type: 'infants',
                          age: 'Dưới 2 tuổi',
                        },
                      ].map(({ label, type, age }) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-gray-700">{label}</p>
                            <p className="text-xs text-gray-500">{age}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePassengerChange(type, 'decrease')
                              }
                            >
                              −
                            </Button>
                            <span>{passengers[type]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePassengerChange(type, 'increase')
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Room Section */}
                    <div className="space-y-4 border-t p-4">
                      <Label className="text-sm font-medium">Số phòng</Label>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange('decrease')}
                        >
                          −
                        </Button>
                        <span>{passengers.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange('increase')}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Class Section */}
                    <div className="space-y-4 border-t p-4">
                      <Label className="text-sm font-medium">Khoang dịch vụ</Label>
                      <RadioGroup
                        value={passengers.class}
                        onValueChange={handleClassChange}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="economy" id="economy" />
                          <Label htmlFor="economy" className="text-gray-700">
                            Phổ thông
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium" className="text-gray-700">
                            Cao cấp (Thương gia/Hạng nhất)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Confirm Button */}
                    <div className="border-t p-4">
                      <Button
                        className="w-full bg-[#ff4d4d] text-white hover:bg-[#c84c4c]"
                        onClick={() => setIsOpen(false)}
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button className="rounded-lg bg-[#ff4d4d] py-3 text-white hover:bg-[#c84c4c]">
                Tìm kiếm
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'flights-hotel' && (
          <div className="space-y-4">
            {/* Trip Type */}
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setTripType(value)}
              className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="round-trip"
                  id="round-trip"
                  className="text-[#c84c4c]"
                />
                <Label htmlFor="round-trip" className="text-lg font-medium">
                  Khứ hồi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="one-way"
                  id="one-way"
                  className="text-[#c84c4c]"
                />
                <Label htmlFor="one-way" className="text-lg font-medium">
                  Một chiều
                </Label>
              </div>
            </RadioGroup>

            {/* From, To, Departure Date, Return Date */}
            <div className="col-span-1 flex flex-col items-center md:col-span-2 md:flex-row">
              <div className="relative w-full">
                <Label
                  htmlFor="from"
                  className="mb-1 block text-sm text-gray-600"
                >
                  Từ
                </Label>
                <Input
                  id="from"
                  placeholder="Chọn điểm khởi hành"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              {/* Switch Arrow */}
              <span
                className="mx-0 mt-2 cursor-pointer text-gray-400 hover:text-gray-600 md:mx-4 md:mt-6"
                onClick={() => {
                  // Swap From and To values
                  setFrom(to);
                  setTo(from);
                }}
              >
                ⇄
              </span>

              {/* To */}
              <div className="relative w-full">
                <Label
                  htmlFor="to"
                  className="mb-1 block text-sm text-gray-600"
                >
                  Đến
                </Label>
                <Input
                  id="to"
                  placeholder="Chọn điểm đến"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="relative w-full md:px-4">
                <Label htmlFor="departure">Khởi hành</Label>
                <DatePicker
                  id="departure"
                  date={departure}
                  setDate={setDeparture}
                />
              </div>
              {tripType === 'round-trip' && (
                <div className="relative w-full">
                  <Label htmlFor="return">Trở về</Label>
                  <DatePicker
                    id="return"
                    date={returnDate}
                    setDate={setReturnDate}
                  />
                </div>
              )}
            </div>

            {/* Passengers and Class */}
            <div className="mt-6 flex flex-col space-y-4 sm:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="relative w-full pr-0 md:max-w-xs md:pr-4">
                <Button
                  onClick={toggleDropdown}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-left text-gray-700 hover:bg-[#ff4d4d]"
                >
                  {`${passengers.adults + passengers.children + passengers.infants} Hành khách${
                    passengers.adults +
                      passengers.children +
                      passengers.infants >
                    1
                      ? ''
                      : ''
                  } ${passengers.class === 'economy' ? 'phổ thông' : 'cao cấp'} | ${passengers.rooms} Phòng`}
                </Button>

                {isOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                    {/* Passengers Section */}
                    <div className="space-y-4 p-4">
                      <Label className="text-sm font-medium">Hành khách</Label>

                      {[
                        { label: 'Người lớn', type: 'adults', age: '12+ tuổi' },
                        { label: 'Trẻ em', type: 'children', age: '2-11 tuổi' },
                        {
                          label: 'Em bé',
                          type: 'infants',
                          age: 'Dưới 2 tuổi',
                        },
                      ].map(({ label, type, age }) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="text-gray-700">{label}</p>
                            <p className="text-xs text-gray-500">{age}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePassengerChange(type, 'decrease')
                              }
                            >
                              −
                            </Button>
                            <span>{passengers[type]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handlePassengerChange(type, 'increase')
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Room Section */}
                    <div className="space-y-4 border-t p-4">
                      <Label className="text-sm font-medium">Số phòng</Label>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange('decrease')}
                        >
                          −
                        </Button>
                        <span>{passengers.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange('increase')}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Class Section */}
                    <div className="space-y-4 border-t p-4">
                      <Label className="text-sm font-medium">Khoang dịch vụ</Label>
                      <RadioGroup
                        value={passengers.class}
                        onValueChange={handleClassChange}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="economy" id="economy" />
                          <Label htmlFor="economy" className="text-gray-700">
                            Phổ thông
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium" />
                          <Label htmlFor="premium" className="text-gray-700">
                            Cao cấp (Thương gia/Hạng nhất)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Confirm Button */}
                    <div className="border-t p-4">
                      <Button
                        className="w-full bg-[#ff4d4d] text-white hover:bg-[#c84c4c]"
                        onClick={() => setIsOpen(false)}
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button className="rounded-lg bg-[#ff4d4d] px-6 py-3 text-white hover:bg-[#c84c4c]">
                Tìm kiếm
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StopOver;
