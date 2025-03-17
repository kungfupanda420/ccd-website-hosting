import React, { useState,useEffect } from 'react';
import '../pagesCss/Admin.css';
import NewsMedia from "../components/NewsMedia";
import ActivePrograms from "../components/ActivePrograms";
import Queries from '../components/Queries';

function Admin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("/api/internships")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setColumns(Object.keys(data[0] || {})); // Get column names dynamically
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, []);

  const [news_img, setNewsImg] = useState('');
  const [news_title, setNewsTitle] = useState('');
  const [news_subtext, setNewsSubtext] = useState('');
  const [deleteTitle, setDeleteTitle] = useState('');

  const [program_title, setProgramTitle] = useState('');
  const [program_tags, setProgramTags] = useState('');
  const [program_details, setProgramDetails] = useState('');
  const [program_pdf, setProgramPdf] = useState(null);
  const [deleteProgramTitle, setDeleteProgramTitle] = useState('');

  const handlePostNewsMedia = async () => {
    if (!news_img || !news_title || !news_subtext) {
      alert('Please fill in all the fields for News Media');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('img', news_img);
      formData.append('title', news_title);
      formData.append('subtext', news_subtext);

      const response = await fetch('/api/news-media', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostProgram = async () => {
  if (!program_title || !program_tags || !program_details || !program_pdf) {
    alert('Please fill in all the fields for Active Programs');
    return;
  }

  // Split the tags input into an array of tags
  const tagsArray = program_tags.split(' ');

    try {
      const formData = new FormData();
      formData.append('title', program_title);
      formData.append('tags', JSON.stringify(tagsArray)); // Convert the array to a JSON string
      formData.append('details', program_details);
      formData.append('pdf', program_pdf);

      const response = await fetch('/api/active-program', {
        method: 'POST',
        body: formData,
      });
      window.location.reload();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    if (!deleteTitle) {
      alert('Please enter the title of the card to delete');
      return;
    }
  
    try {
      await fetch(`/api/news-media/${deleteTitle}`, {
        method: 'DELETE',
      });
  
      // Refresh the page after attempting deletion
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteProgram = async () => {
    if (!deleteProgramTitle) {
      alert('Please enter the title of the active program card to delete');
      return;
    }

    try {
      await fetch(`/api/active-program/${deleteProgramTitle}`, {
        method: 'DELETE',
      });

      // Refresh the page after attempting deletion
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='adminContainer'>
        <div className='adminStaticHolder'>
          <div className='titleContainer'>
            <h1 className='adminHeading'>CCD ADMIN PAGE</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="tableContainer">
              <table className="applicationsTable">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td> {/* Auto-increment ID */}
                      {Object.keys(app).map((col) => (
                        <td key={col}>
                          {col.includes("docs") ||
                          col.includes("photo") ||
                          col.includes("payment") ? (
                            <a href={`/${app[col]}`} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          ) : (
                            app[col]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div> 
      </div>
    </>
  );
}

export default Admin;
