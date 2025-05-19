import { Card, CardContent } from '../../../components/ui/Card';

const PassengerInfo = ({ passengers }) => {
  return (
    <Card>
      <CardContent className="p-2 md:p-6">
        <h3 className="mb-2 text-lg font-semibold">Passenger Information</h3>
        {passengers && passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <div key={index} className="mb-2">
              <p>
                Name: {passenger.first_name} {passenger.last_name}
              </p>
              <p>Email: {passenger.email}</p>
              <p>Phone: {passenger.phone}</p>
            </div>
          ))
        ) : (
          <p>No passenger information available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PassengerInfo;
