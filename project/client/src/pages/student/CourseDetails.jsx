import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';

const CourseDetails = () => {

  const {id} = useParams();
  const [courseData, setCourseData] = useState(null);
  const {allCourses, calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures} = useContext(AppContext);


  const fetchCourseData = async () => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  }

  useEffect(() => {
    fetchCourseData();
  }, [])

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>

        {/* left column */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p
           className='pt-4 md:text-base text-sm'
           dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0, 200)}}></p>

          {/* review and rating */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
              <p>{calculateRating(courseData)}</p>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (<img className='w-3.5 h-3.5' key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' />))}
              </div>
              <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
              <p className=''>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>

          <p className='text-sm'>Course by <span className='text-blue-600 underline'>Aman</span></p>

            <div className='pt-8 text-gray-800'>
              <h2 className='text-xl font-semibold'>Course Structure</h2>
              <div className='pt-5'>
                {courseData.courseContent.map((chapter, index) => (
                  <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                      <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                          <div className='flex items-center gap-2'>
                              <img className='' src={assets.down_arrow_icon} alt="arrow_icon" />
                              <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                          </div>
                          <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                      </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

        
        {/* right column */}
        <div className=''></div>


    </div>
    </>
  ) : <Loading/>
}

export default CourseDetails