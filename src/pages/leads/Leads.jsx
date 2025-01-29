import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import { setAutoLeadsAssign, setCurLead } from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import DocumentUpload from "../../components/smallComponents/DocumentUpload";
import { useState } from "react";
import ModalBase from "../../components/Forms/ModalBase";
import AddLead from "../../components/Forms/Leads/AddLead";

// const lead = {
//   num: 3,
//   name: "John Doe",
//   img: "https://via.placeholder.com/150",
//   number: 1234567890,
//   status: "Interested",
//   statusColor: "red",
//   remark:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
//   applications: 2,
//   attempts: 1,
//   country: "Germany",
//   count: 3,
// };
// const arr = [...Array(500)].map((_, i) => {
//   const obj = { ...lead, _id: i };
//   return obj;
// });

const names = [
  "Aarav",
  "Aaryan",
  "Adarsh",
  "Adithya",
  "Advik",
  "Akhil",
  "Amal",
  "Anand",
  "Ananthu",
  "Anish",
  "Arjun",
  "Arvind",
  "Ashwin",
  "Bhavana",
  "Chithra",
  "Dev",
  "Dhanush",
  "Deepak",
  "Dileep",
  "Eashan",
  "Fahad",
  "Gautham",
  "Govind",
  "Hari",
  "Harikrishnan",
  "Harsha",
  "Indrajith",
  "Jagadeesh",
  "Jithin",
  "Jeevan",
  "Kannan",
  "Krishna",
  "Karthik",
  "Lakshmi",
  "Lekha",
  "Madhavan",
  "Mahesh",
  "Maya",
  "Meera",
  "Mithun",
  "Mohan",
  "Nakul",
  "Nandan",
  "Narayan",
  "Nayana",
  "Nikhil",
  "Niranjana",
  "Parvathy",
  "Pranav",
  "Pranitha",
  "Prashanth",
  "Praveen",
  "Preetha",
  "Priya",
  "Rahul",
  "Rajeev",
  "Rakesh",
  "Ram",
  "Ravi",
  "Reshma",
  "Revathi",
  "Riya",
  "Rohit",
  "Saanvi",
  "Sagar",
  "Sandeep",
  "Santhosh",
  "Saranya",
  "Sarath",
  "Sharath",
  "Siddharth",
  "Sreeram",
  "Suhas",
  "Sumesh",
  "Suraj",
  "Surya",
  "Swathi",
  "Tara",
  "Tejas",
  "Ujwal",
  "Usha",
  "Ved",
  "Vihaan",
  "Vignesh",
  "Vinay",
  "Vineeth",
  "Vinu",
  "Vishnu",
  "Vivek",
  "Yash",
  "Zara",
  "Zoya",
  "Akhila",
  "Ananya",
  "Arya",
  "Avani",
  "Diya",
  "Ishaan",
  "Ishika",
  "Kabir",
];

const statuses = [
  "Interested",
  "Pending",
  "Not Interested",
  "Follow Up",
  "Converted",
  "Closed",
  "New Lead",
  "Attempted",
  "In Progress",
  "Prospect",
  "Lost",
  "More Info",
  "Proposal Sent",
  "Waiting",
  "Appointment",
  "Contact",
  "Cold Lead",
  "Hot Lead",
  "Verified",
  "Unverified",
];

const countries = [
  "Germany",
  "USA",
  "India",
  "UK",
  "France",
  "Italy",
  "Brazil",
  "Russia",
  "China",
  "Japan",
  "Canada",
  "Australia",
  "Spain",
  "Mexico",
  "South Korea",
  "South Africa",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Argentina",
];
const img =
  "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";
const arr = [...Array(100)].map((_, i) => ({
  num: 1,
  name: names[i % names.length], // Cycle through the names
  img,
  number: Math.floor(1000000000 + Math.random() * 9000000000), // Random 10-digit number
  status: statuses[i % statuses.length], // Cycle through statuses
  statusColor: ["red", "green", "blue", "brown"][i % 4], // Random color cycling
  remark: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  applications: Math.floor(Math.random() * 5) + 1, // Random between 1-5
  attempts: Math.floor(Math.random() * 3) + 1,
  country: countries[i % countries.length],
  count: Math.floor(Math.random() * 5) + 1,
  _id: i,
}));

export default function Leads() {
  const { autoLeadsAssign, curLead } = useSelector((state) => state.leads);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
    setIsModalOpen((val) => !val);
  };

  const [newLead, setNewLead] = useState({
    name: "",
    DOM: "",
    Contact: "",
    Whatsupp: "",
    Mail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ISearchBar = <SearchBar />;
  const IAutoBtn = <AutoBtn />;
  const IContents = arr?.map((lead, index) => (
    <LeadCard
      key={index}
      onSet={setCurLead}
      set={curLead}
      lead={lead}
      istoggle={autoLeadsAssign}
      toggle={setAutoLeadsAssign}
    />
  ));

  const ISelector = <Selector />;

  const IPrimaryBttn = (
    <PrimaryBttn onClick={handleModal}>Add Leads</PrimaryBttn>
  );

  const IAllLeads = <AllLeads />;
  const ISelectorOne = <Selector />;
  const ISelectorTwo = <Selector />;
  const ISelectorThree = <Selector />;
  const ISelectorFour = <Selector />;
  const ISelectorFive = <Selector />;

  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ISearchBar}</div>,
    <div key="auto-btn">{IAutoBtn}</div>,
    <div key="selector">{ISelector}</div>,
  ];
  const TopRight = [<div key="primary-btn">{IPrimaryBttn}</div>];

  const BottomLeft = [
    <div key="all-leads">{IAllLeads}</div>,
    <div key="selector-one">{ISelectorOne}</div>,
    <div key="selector-two">{ISelectorTwo}</div>,
    <div key="selector-three">{ISelectorThree}</div>,
  ];
  const BottomRight = [
    <div key="selector-four">{ISelectorFour}</div>,
    <div key="selector-five">{ISelectorFive}</div>,
  ];

  const IDocumentUpload = <DocumentUpload />;
  const IProfileCard = (
    <ProfileCard IDocumentUpload={IDocumentUpload} lead={curLead} />
  );

  return (
    <>
      <MainBody
        TopLeft={TopLeft}
        TopRight={TopRight}
        IContents={IContents}
        switching={autoLeadsAssign}
        BottomLeft={BottomLeft}
        BottomRight={BottomRight}
        ProfileCard={IProfileCard}
        StartApplication={IStartApplication}
      />

      {/* Modal for adding a leads */}
      <ModalBase title="Add Lead" isOpen={isModalOpen} closeModal={closeModal}>
        <AddLead
          closeModal={closeModal}
          newLead={newLead}
          setNewLead={setNewLead}
          handleChange={handleChange}
        />
      </ModalBase>
    </>
  );
}
