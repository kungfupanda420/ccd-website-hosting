          {/* News Media */}
          {/* <div className='newsMediaForm'>
            <Queries/>
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
          </div> */}
          {/* Active Programs */}
          
          {/* <div className='activeProgramsForm'>
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
          </div>*/}