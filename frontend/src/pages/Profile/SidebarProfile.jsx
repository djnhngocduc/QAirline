import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/Avatar';

const SidebarProfile = () => {
  const [userData, setUserData] = useState({
    profilePictureUrl: '',
    fullName: '',
    membershipNumber: '',
    avios: 0,
    qpoints: 0,
    qcredits: 0,
  });

  const [shortName, setShortName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/customer/my-info',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = await response.json();
        setUserData({
          profilePictureUrl: data.User.profilePicture,
          fullName: `${data.title} ${data.first_name} ${data.middle_name} ${data.last_name}`,
          membershipNumber: data.id * data.user_id * 653432,
          avios: data.avios || 0,
          qpoints: data.qpoints || 0,
          qcredits: data.qcredits || 0,
        });
        setShortName(data.first_name.charAt(0) + data.last_name.charAt(0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className="w-full px-3 md:w-64 md:max-w-sm md:px-0">
      <Card className="rounded-md border-none bg-gradient-to-r from-[#10A7CD] to-[#3DCDF0] py-5 text-center text-white">
        <CardHeader>
          <Avatar className="mx-auto h-24 w-24">
            <AvatarImage
              src={userData.profilePictureUrl}
              alt={userData.fullName}
            />
            <AvatarFallback className="text-3xl text-gray-700">
              {shortName}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">{userData.fullName}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm">
            Membership number: <strong>{userData.membershipNumber}</strong>
          </p>
          <div className="mt-4 space-y-1 text-sm text-[#0a0a0a]">
            <p>Apoints: <span className="text-2xl font-bold">5</span></p>
            <p>Qpoints: <span className="text-2xl font-bold">10</span></p>
          </div>
          <p>_________________________</p>
        </CardContent>
      </Card>
    </aside>
  );
};

export default SidebarProfile;
