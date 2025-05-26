import Avatar from 'react-avatar';

const DropdownUser = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar 
        name="Admin" 
        size="40" 
        round={true} 
        color="#10a7cd" // Tùy chỉnh màu sắc
        fgColor="#ffffff" // Màu chữ
      />
    </div>
  );
};

export default DropdownUser;
