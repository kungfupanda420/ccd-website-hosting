import React, { useState } from 'react';
import '../pagesCss/Admin.css';
import NewsMedia from "../components/NewsMedia";
import ActivePrograms from "../components/ActivePrograms";

function Admin() {
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
          {/* News Media */}
          <div className='newsMediaForm'>
            <NewsMedia />
            <div className='newsMediaInputContainer'>
              <h1>POST NEWS MEDIA</h1>
              <div className='inputPair'>
                <label htmlFor='imgInput'>Image:</label>
                <input
                  type='file'
                  id='imgInput'
                  name='img'
                  accept='.png, .jpeg, .jpg'
                  onChange={(e) => setNewsImg(e.target.files[0])}
                />
              </div>
              <div className='inputPair'>
                <label htmlFor='titleInput'>Title:</label>
                <input
                  type='text'
                  id='titleInput'
                  value={news_title}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder='Enter Title of card'
                />
              </div>
              <div className='inputPair'>
                <label htmlFor='subtextInput'>Subtext:</label>
                <textarea
                  id='subtextInput'
                  value={news_subtext}
                  onChange={(e) => setNewsSubtext(e.target.value)}
                />
              </div>
              <button className='newsMediaPostButton' onClick={handlePostNewsMedia}>
                Post
              </button>
              <div className='inputPair'>
                <label htmlFor='deleteInput'>Delete:</label>
                <input
                  type='text'
                  id='deleteInput'
                  value={deleteTitle}
                  onChange={(e) => setDeleteTitle(e.target.value)}
                  placeholder='Enter Title of card to delete'
                />
              </div>
              <button className='newsMediaDeleteButton' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          {/* Active Programs */}
          
          <div className='activeProgramsForm'>
            <ActivePrograms />
              <div className='activeProgramsContainer'>
              <h1>POST ACTIVE PROGRAMS</h1>
              <div className='inputPair'>
                <label htmlFor='programTitleInput'>Title:</label>
                <input
                  type='text'
                  id='programTitleInput'
                  value={program_title}
                  onChange={(e) => setProgramTitle(e.target.value)}
                  placeholder='Enter Program Title'
                />
              </div>
              <div className='inputPair'>
                <label htmlFor='programTagsInput'>Tags:</label>
                <input
                  type='text'
                  id='programTagsInput'
                  value={program_tags}
                  onChange={(e) => setProgramTags(e.target.value)}
                  placeholder='tags as space seperated'
                />
              </div>
              <div className='inputPair'>
                <label htmlFor='programDetailsInput'>Details:</label>
                <textarea
                  id='programDetailsInput'
                  value={program_details}
                  onChange={(e) => setProgramDetails(e.target.value)}
                  placeholder='Enter Program Details'
                />
              </div>
              <div className='inputPair'>
                <label htmlFor='programPdfInput'>PDF:</label>
                <input
                  type='file'
                  id='programPdfInput'
                  name='pdf'
                  accept='.pdf'
                  onChange={(e) => setProgramPdf(e.target.files[0])}
                />
              </div>
              <button className='activeProgramPostButton' onClick={handlePostProgram}>
                Post
              </button>
              <div className='inputPair'>
                <label htmlFor='deleteProgramInput'>Delete Program:</label>
                <input
                  type='text'
                  id='deleteProgramInput'
                  value={deleteProgramTitle}
                  onChange={(e) => setDeleteProgramTitle(e.target.value)}
                  placeholder='Enter Title of active program card to delete'
                />
              </div>
              <button className='activeProgramDeleteButton' onClick={handleDeleteProgram}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
