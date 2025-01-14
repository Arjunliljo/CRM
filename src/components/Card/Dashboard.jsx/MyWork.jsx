export default function MyWork() {
    const data = [
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "green"
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "blue"
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "green"
        },
        {
            name: "Arun Kumar",
            id: "102156 UK",
            program: "Master Of Technology in Information Technology",
            status: "Verification failed, Submit documents before 12 March",
            date: "12 Feb",
            time: "11am",
            color: "blue"
        }
    ];

    return (
        <div className="dashboard-card">
            <header>
                <h1>My Work</h1>
                <button className="add-button">+</button>
            </header>
            <div className="dashboard-card-search-bar">
                <div className="search-input-container">
                    <span className="search-icon">+</span>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="work-items">
                {data.map((item, index) => (
                    <div key={index} className={`work-item ${item.color}`}>
                        <div className="work-item-content">
                            <h2>{item.name}</h2>
                            <p>{item.id}</p>
                            <p className="program">{item.program}</p>
                            <p className="status">{item.status}</p>
                        </div>
                        <div className="work-item-footer">
                            <p>{item.date} at {item.time}</p>
                            <button className="comment-button">💬</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
