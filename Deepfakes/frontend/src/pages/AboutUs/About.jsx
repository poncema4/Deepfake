import './About.css';

export default function About() {
  const members = [
    { 
      name: "Marco Ponce", 
      role: "Senior", 
      bio: "I am a Computer Science major at Seton Hall doing research in Logic Programming and Cybersecurity. After college, I plan to work as a Data Scientist or Software Engineer.",
      img: "src/assets/pfps/marco.jpg"
    }
  ];

  return (
    <section id="about">
      <h2>👥 Meet the Team</h2>
      <div className="team-container">
        {members.map((member, idx) => (
          <div key={idx} className="team-member">
            <img src={member.img} alt={`${member.name}'s profile`} className="profile-pic" />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}