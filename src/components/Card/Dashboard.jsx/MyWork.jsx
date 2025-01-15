import Mover from "../../../features/Mover";
import HomeIcon from "../../utils/Icons/HomeIcon";

export default function MyWork() {
    const data = [
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "green",
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "blue",
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "green",
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "blue",
        },
    ];

    return (
        <div className="dashboard-card">
            <header>
                <h1>My Work</h1>
                <button className="add-button">
                    <HomeIcon
                        path="plus"
                        color="#000000f8"
                        style={{ transform: "rotate(270deg)" }}
                    />
                </button>
            </header>
            <div className="dashboard-card-search-bar">
                <div className="search-input-container">
                    <span className="search-icon">
                        <HomeIcon
                            path="search"
                            color="#fffffff8"
                            style={{ transform: "rotate(270deg)" }}
                        />
                    </span>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="work-items">
                {data.map((item, index) => (
                    <div key={index} className={`work-item ${item.color}`}>
                        <div className="work-item-content">
                            <div className="work-item-content-top">
                                <div className="work-item-content-top-left">
                                    <div className="message-item__avatar">
                                        <img
                                            src="https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                                            alt=" user"
                                        />
                                    </div>
                                    <div className="work-item-content-name-container">
                                        <h2>{item.name}</h2>
                                        <span className="work-item-content-sm-bold">{item.id}</span>
                                    </div>
                                </div>
                                <HomeIcon
                                    path="message"
                                    color="#9a9e9a"
                                    style={{ transform: "rotate(270deg)" }}
                                />
                            </div>
                            {/* <div className="work-item-content-bottom"> */}
                            <span className="work-item-content-program">{item.program}</span>
                            <div> <Mover num={item.num} /></div>
                            <div className="work-item-footer">
                                <span className="work-item-content-sm-bold">{item.status}</span>

                                <span className="work-item-footer-date">
                                    {item.date}
                                    <p>at {item.time}</p>
                                </span>
                            </div>
                            {/* </div> */}

                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
}
