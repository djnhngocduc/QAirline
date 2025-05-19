import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tab';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../../components/ui/Accordion';
import { FaPlane, FaHotel, FaUserCheck, FaInfoCircle } from 'react-icons/fa';
import BookAFlight from '../FlightTab/BookFlight';
import Stopover from '../FlightTab/StopOver';
import ManageBooking from '../FlightTab/ManageBooking';
import FlightStatus from '../FlightTab/FlightStatus';
import { useEffect, useState } from 'react';

function FlightTab() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-lg bg-gray-50 shadow-lg">
      {/* Tabs Header */}
      {!isMobile && (
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="flex justify-between rounded-lg">
            <TabsTrigger
              value="book"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaPlane className="text-xl" /> Đặt vé
            </TabsTrigger>
            <TabsTrigger
              value="stopover"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaHotel className="text-xl" /> Stopover / Packages
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaUserCheck className="text-xl" /> Manage / Check in
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-[#ff4d4d] hover:text-white focus:outline-none"
            >
              <FaInfoCircle className="text-xl" /> Flight status
            </TabsTrigger>
          </TabsList>

          {/* Tab Content cho màn hình lớn */}
          <TabsContent value="book">
            <BookAFlight />
          </TabsContent>
          <TabsContent value="stopover">
            <Stopover />
          </TabsContent>
          <TabsContent value="manage">
            <ManageBooking />
          </TabsContent>
          <TabsContent value="status">
            <FlightStatus />
          </TabsContent>
        </Tabs>
      )}

      {/* Accordion Menu cho màn hình nhỏ */}
      {isMobile && (
        <div className="block md:hidden">
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="book">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaPlane className="text-xl" /> Đặt vé
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <BookAFlight />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="stopover">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaHotel className="text-xl" /> Stopover / Packages
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <Stopover />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="manage">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaUserCheck className="text-xl" /> Manage / Check in
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <ManageBooking />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="status">
              <AccordionTrigger className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-gray-700">
                <FaInfoCircle className="text-xl" /> Flight status
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <FlightStatus />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default FlightTab;
