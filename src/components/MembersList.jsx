// MembersList.jsx
import React from 'react';
import Card2 from './Card2';

const membersData = [
  {
    id: 1,
    idNumber: "1042",
    name: "John Doe",
    image: "/images/john.jpg", 
    lab: "norman", 
    role: "Syndicate",
    socialLinks: {
      github: "https://github.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: 2,
    idNumber: "1043",
    name: "Jane Smith",
    image: "/images/jane.jpg",
    lab: "satoshi", 
    role: "Associate",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/"
    }
  },
  {
    id: 3,
    idNumber: "1044",
    name: "Alex Johnson",
    image: "/images/alex.jpg",
    lab: "tesla", 
    role: "Member",
    socialLinks: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }
  },
  {
    id: 4,
    idNumber: "1045",
    name: "Sarah Connor",
    image: "/images/sarah.jpg",
    lab: "mccarthy", 
    role: "Syndicate",
    socialLinks: {
      github: "https://github.com/",
    }
  },
  {
    id: 5,
    idNumber: "1046",
    name: "Alan Turing",
    image: "/images/alan.jpg",
    lab: "pausch", 
    role: "Associate",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/"
    }
  }
];

const MembersList = () => {
  return (
    <div className="flex flex-wrap gap-12 p-10 justify-center items-center bg-gray-50 min-h-screen">
      {membersData.map((member) => (
        <Card2 key={member.id} data={member} />
      ))}
    </div>
  );
};

export default MembersList;