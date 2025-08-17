import { GrAnnounce } from "react-icons/gr";
import { MdOutlineEventAvailable, MdMeetingRoom } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { PiTextAlignJustifyFill } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuNotebookText } from "react-icons/lu";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import ForYou from "./ForYou";
import PaidTask from "./PaidTasks";

const Home = () => {
  return (
    <Layout>
      <div className="bg-blue-950 text-white px-4 md:px-32 py-8 md:py-12">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl md:text-4xl font-bold text-center flex-1">
            Welcome to Kalvakhy
          </h1>
          <Link to='/events'> <GrAnnounce className="text-2xl md:text-3xl" /></Link>
          
        </div>

        {/* <ul className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 mt-8 overflow-x-auto">
          <li>
            <Link
              to="/events"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <MdOutlineEventAvailable />
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/announcement"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <BiBell />
              Announcements
            </Link>
          </li>
          <li>
            <Link
              to="/result"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <PiTextAlignJustifyFill />
              Results
            </Link>
          </li>
          <li>
            <Link
              to="/meeting"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <MdMeetingRoom />
              Meetings
            </Link>
          </li>
          <li>
            <Link
              to="/notice"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <IoDocumentTextOutline />
              Notices
            </Link>
          </li>
          <li>
            <Link
              to="/task"
              className="flex items-center gap-1 bg-[#31498c] px-3 py-2 rounded-2xl whitespace-nowrap"
            >
              <LuNotebookText />
              Tasks
            </Link>
          </li>
        </ul> */}

        <div className="mt-5">
          <ForYou />
          {/* <PaidTask /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
