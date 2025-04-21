import './About.css';

export default function About() {
  const members = [
    { 
      name: "Aaron Stanway", 
      role: "Sophomore", 
      bio: "I currently study Financial Mathematics at Seton Hall. I am looking to use my financial modeling and coding skills to either work as a Quantitative Researcher for a Hedge fund or create my own.",
      img: "src/assets/pfps/aaron.jpg"
    },
    { 
      name: "Brysen Pfingsten", 
      role: "Sophomore", 
      bio: "I am a Computer Science major with a research interest in Constraint Logic Programming. After college, I plan on moving to New York and working in the tech sector.",
      img: "src/assets/pfps/brysen.jpeg" },
    { 
      name: "Collin Delbridge", 
      role: "Junior", 
      bio: "I'm a Computer Science major currently interning at GDIT in the Network Administration department. I’m also involved in cybersecurity research and plan to continue growing as a software developer.",
      img: "src/assets/pfps/colin.jpg"
    },
    { 
      name: "Dimitri Short", 
      role: "Senior", 
      bio: "I'm Dimitri, I'm a computer science and data science student here at Seton Hall with a strong interest in technology. I've always been interested by how technology really works which has led me to enter this field. ",
      img: "src/assets/pfps/dimitri.jpeg"
    },
    { 
      name: "Thorin Collins", 
      role: "Sophomore", 
      bio: "I'm an IT Management major with a minor in cybersecurity. I currently work part-time as a Security Operations Center (SOC) analyst. After graduation, I plan to attend law school and pursue a career in cybersecurity law.",
      img: "src/assets/pfps/thorin.jpg"
    },
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
