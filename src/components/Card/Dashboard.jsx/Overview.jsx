import HomeIcon from "../../utils/Icons/HomeIcon";

export default function Overview() {

  const stats = [
    { title: 'Verified', count: 13, icon: 'verify' },
    { title: 'Application', count: 128, icon: 'application' },
    { title: 'Offer Letter', count: 7, icon: 'offer' },
    { title: 'Payment Status', count: 3, icon: 'payment' },
    { title: 'Interview', count: 6, icon: 'interview' },
    { title: 'CAS / VFS', count: 12, icon: 'cas' },
    { title: 'Visa', count: 64, icon: 'visa' },
    { title: 'Enrolled', count: 39, icon: 'enrolled' }
  ];

  return (
    <div className="overview">
      <h2 className="overview__title">Overview</h2>
      <div className="overview__grid">
        {stats.map((item, index) => (
          <div key={index} className="overview__item">
            <div className={`overview__icon`}>
              <HomeIcon
                path="retry"
                color="#fffffff9"
                style={{ transform: "rotate(270deg)" }}
              />
            </div>
            <div className="overview__content">
              <span className="overview__count">{item.count}</span>
              <span className="overview__label">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
