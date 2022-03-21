import './single-job.css';
import React from 'react'
import {JOB} from '../../interfaces/job';

interface Props {
    jobInfo: JOB
}

const SingleJob:React.FC<Props> = ({jobInfo}) => {
  return (
    <div className='single-job-container'>{jobInfo.company_name} ({jobInfo.category}) - posted on {jobInfo.publication_date}</div>
  )
}

export default SingleJob;