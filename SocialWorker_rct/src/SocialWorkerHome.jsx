import React, { useState } from 'react';
import './SWH.css';

const SocialWorkerHome = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [clientDetails, setClientDetails] = useState(null);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Store summaries as a map: key = sessionId (date + time), value = summary text
  const [sessionSummaries, setSessionSummaries] = useState({
    '2025-05-22_10:00': 'Initial intake session. Client discussed challenges with addiction.',
    '2025-05-23_14:00': 'Follow-up session. Client showing signs of improvement.',
  });

  const [sessionSummary, setSessionSummary] = useState('');

  const clients = [
    { name: 'John Doe', id: '1234567890123', file: 'JD1234', suburb: 'Zola', kinName: 'Jane Doe', kinRelation: 'Wife', kinPhone: '0821234567' },
    { name: 'Sarah Smith', id: '9876543210987', file: 'SS9876', suburb: 'Chiawelo', kinName: 'Alice Smith', kinRelation: 'Mother', kinPhone: '0829876543' },
  ];

  const applications = [
    { name: 'John Doe', id: '1234567890123', file: 'JD1234', suburb: 'Zola', status: 'Pending', feedback: 'Awaiting review by rehab admin' },
    { name: 'Sarah Smith', id: '9876543210987', file: 'SS9876', suburb: 'Chiawelo', status: 'Approved', feedback: 'Approved for rehab, awaiting intake' },
  ];

  const sessions = [
    { date: '2025-05-22', time: '10:00', client: { name: 'John', surname: 'Doe', fileNumber: 'JD1234' } },
    { date: '2025-05-23', time: '14:00', client: { name: 'Sarah', surname: 'Smith', fileNumber: 'SS9876' } },
  ];

  const showClientDetails = (client) => {
    setClientDetails(client);
    setApplicationDetails(null);
    setSelectedSession(null);
    setSessionSummary('');
  };

  const showApplicationDetails = (application) => {
    setApplicationDetails(application);
    setClientDetails(null);
    setSelectedSession(null);
    setSessionSummary('');
  };

  const toggleSchedule = () => setShowSchedule(prev => !prev);

  const saveReportAsPDF = () => {
    // Add jsPDF logic here
  };

  const submitApplication = () => {
    // Add submission logic here
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setClientDetails(null);
    setApplicationDetails(null);
    setShowSchedule(false);
    setSelectedSession(null);
    setSessionSummary('');
  };

  // When session clicked: set selected session and load its summary (or empty)
  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setClientDetails(null);
    setApplicationDetails(null);

    const key = `${session.date}_${session.time}`;
    setSessionSummary(sessionSummaries[key] || '');
  };

  const handleSummaryChange = (e) => {
    setSessionSummary(e.target.value);
  };

  // Save or update the summary for the selected session
  const saveSessionSummary = () => {
    if (!selectedSession) return;

    const key = `${selectedSession.date}_${selectedSession.time}`;
    setSessionSummaries(prev => ({
      ...prev,
      [key]: sessionSummary,
    }));

    alert(`Session summary saved for ${selectedSession.client.name} ${selectedSession.client.surname}`);
  };

  // Prepare a list of previous summaries excluding the current one
  const previousSummaries = Object.entries(sessionSummaries).filter(([key]) => {
    if (!selectedSession) return false;
    const currentKey = `${selectedSession.date}_${selectedSession.time}`;
    return key !== currentKey;
  });

  return (
    <div>
      <header id="header" className="header dark-background d-flex flex-column">
        <a href="/" className="logo d-flex align-items-center justify-content-center">
          <h1 className="sitename">Sober Path</h1>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            {['home', 'clients', 'applications', 'sessions'].map(section => (
              <li key={section}>
                <a
                  href="#"
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section);
                  }}
                >
                  <i className={`bi ${
                    section === 'home' ? 'bi-house' :
                    section === 'clients' ? 'bi-person' :
                    section === 'applications' ? 'bi-file-earmark-text' :
                    'bi-hdd-stack'
                  } navicon`}></i> {section === 'home' ? 'Home' : section === 'clients' ? 'My Clients' : section === 'applications' ? 'My Applications' : 'Sessions'}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="nav-link">
                <i className="bi bi-envelope navicon"></i> Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="about" className="about section">
        <div className="home-container">
          <header className="home-header">
            <h2>
              {{
                home: 'Welcome Social Worker',
                clients: 'My Clients',
                applications: 'My Applications',
                sessions: 'Upcoming Sessions'
              }[activeSection]}
            </h2>
            {activeSection === 'clients' && (
              <input type="text" placeholder="Search clients..." className="search-bar" />
            )}
          </header>

          <main className="home-content">
            {/* HOME SECTION */}
            {activeSection === 'home' && (
              <p>Welcome to your dashboard! Select a section from the sidebar.</p>
            )}

            {/* CLIENTS SECTION */}
            {activeSection === 'clients' && (
              <table className="shared-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID Number</th>
                    <th>File Number</th>
                    <th>Suburb</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.id}</td>
                      <td>{client.file}</td>
                      <td>{client.suburb}</td>
                      <td>
                        <button onClick={() => showClientDetails(client)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* APPLICATIONS SECTION */}
            {activeSection === 'applications' && (
              <ul className="card-list">
                {applications.map((application) => (
                  <li
                    key={application.id}
                    className="card"
                    onClick={() => showApplicationDetails(application)}
                  >
                    {application.name} - Status: {application.status}
                  </li>
                ))}
              </ul>
            )}

            {/* SESSIONS SECTION */}
            {activeSection === 'sessions' && (
              <>
                <table className="shared-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Client Name</th>
                      <th>Surname</th>
                      <th>File Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index}>
                        <td>{session.date}</td>
                        <td>{session.time}</td>
                        <td>{session.client.name}</td>
                        <td>{session.client.surname}</td>
                        <td>{session.client.fileNumber}</td>
                        <td>
                          <button onClick={() => handleSessionClick(session)}>View Summary</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Session Summary Section */}
                {selectedSession && (
                  <section className="details-panel session-summary">
                    <h2>Session Summary for {selectedSession.client.name} {selectedSession.client.surname}</h2>
                    <p><strong>Date:</strong> {selectedSession.date}</p>
                    <p><strong>Time:</strong> {selectedSession.time}</p>

                    <textarea
                      placeholder="Write session summary here..."
                      value={sessionSummary}
                      onChange={handleSummaryChange}
                      rows={6}
                    ></textarea>

                    <div className="action-buttons">
                      <button onClick={saveSessionSummary}>Save Summary</button>
                    </div>

                    <h3>Previous Session Summaries</h3>
                    {previousSummaries.length === 0 && (
                      <p>No previous summaries available.</p>
                    )}
                    <div className="previous-summaries-list" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                      {previousSummaries.map(([key, summary]) => {
                        // key format: date_time
                        const [date, time] = key.split('_');
                        return (
                          <div key={key} style={{ marginBottom: '15px' }}>
                            <strong>{date} at {time}</strong>
                            <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#33675b', padding: '8px', borderRadius: '4px' }}>{summary}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* CLIENT DETAILS */}
            {clientDetails && (
              <section id="client-details" className="details-panel">
                <h2>Client Details</h2>
                <p><strong>Name:</strong> {clientDetails.name}</p>
                <p><strong>ID Number:</strong> {clientDetails.id}</p>
                <p><strong>File Number:</strong> {clientDetails.file}</p>
                <p><strong>Suburb:</strong> {clientDetails.suburb}</p>

                <h3>Next of Kin</h3>
                <p><strong>Name:</strong> {clientDetails.kinName}</p>
                <p><strong>Relationship:</strong> {clientDetails.kinRelation}</p>
                <p><strong>Phone Number:</strong> {clientDetails.kinPhone}</p>

                <textarea placeholder="Write session report here..."></textarea>

                <label htmlFor="supportingDocs">Upload Supporting Documents (PDF):</label>
                <input type="file" id="supportingDocs" multiple accept="application/pdf" />
                <ul id="pdfPreviewList" className="pdf-list"></ul>

                <div className="date-time">
                  <button onClick={toggleSchedule}>Schedule Next Session</button>
                  {showSchedule && (
                    <>
                      <label htmlFor="sessionDate">Date:</label>
                      <input type="date" id="sessionDate" />
                      <label htmlFor="sessionTime">Time:</label>
                      <input type="time" id="sessionTime" />
                    </>
                  )}
                </div>

                <div className="action-buttons">
                  <button onClick={saveReportAsPDF}>Save Report as PDF</button>
                  <button onClick={submitApplication}>Apply for Rehab</button>
                </div>
              </section>
            )}

            {/* APPLICATION DETAILS */}
            {applicationDetails && (
              <section id="application-details" className="details-panel">
                <h2>Application Details</h2>
                <p><strong>Name:</strong> {applicationDetails.name}</p>
                <p><strong>Status:</strong> {applicationDetails.status}</p>
                <p><strong>Feedback from Rehab Admin:</strong> {applicationDetails.feedback}</p>
                <p><strong>ID Number:</strong> {applicationDetails.id}</p>
                <p><strong>File Number:</strong> {applicationDetails.file}</p>
                <p><strong>Suburb:</strong> {applicationDetails.suburb}</p>
              </section>
            )}
          </main>
        </div>
      </section>
    </div>
  );
};

export default SocialWorkerHome;
