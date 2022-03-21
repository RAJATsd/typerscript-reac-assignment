import "./jobs-list.css";
import React, { useEffect, useState } from "react";
import { fetchAllJobs } from "../../api/jobs";
import { JOB, JOB_API } from "../../interfaces/job";
import SingleJob from "../single-job/single-job";
import JobsInfoAndFiltering from "../jobs-info-and-filtering/jobs-info-and-filtering";

const JobsList: React.FC = () => {
  const [allJobs, setAllJobs] = useState<JOB[]>([]);
  const [allCompanyNames, setAllCompanyNames] = useState<string[]>([]);
  const [allCategoryNames, setAllCategoryNames] = useState<string[]>([]);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState<number>(0);
  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const renderingArrayFormation: () => JOB[] = () =>
    sortByDate
      ? [...allJobs]
          .sort(
            (a, b) =>
              new Date(a.publication_date).valueOf() -
              new Date(b.publication_date).valueOf()
          )
          .filter(
            (singleJob, index) =>
              index >= (pageNumber - 1) * 10 && index < pageNumber * 10
          )
      : allJobs.filter(
          (singleJob, index) =>
            index >= (pageNumber - 1) * 10 && index < pageNumber * 10
        );

  const fetchJobsByApi = async () => {
    const allJobsData: JOB_API = await fetchAllJobs();
    const companyNameSet = new Set<string>();
    const categoryNameSet = new Set<string>();
    allJobsData.jobs.forEach((singleJob: JOB) => {
      companyNameSet.add(singleJob.company_name);
      categoryNameSet.add(singleJob.category);
    });
    setAllJobs(allJobsData.jobs);
    setTotalNumberOfJobs(allJobsData["job-count"]);
    setAllCompanyNames(Array.from(companyNameSet));
    setAllCategoryNames(Array.from(categoryNameSet));
  };

  useEffect(() => {
    fetchJobsByApi();
  }, []);

  const changePageNumber = (type: "increase" | "decrease") => {
    if (type === "decrease" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else if (
      type === "increase" &&
      pageNumber < Math.ceil(allJobs.length / 10)
    ) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="jobs-list-container">
      <JobsInfoAndFiltering
        allCompanyNames={allCompanyNames}
        allCategoryNames={allCategoryNames}
        totalNumberOfJobs={totalNumberOfJobs}
        setAllJobs={setAllJobs}
        jobsFoundBySearch={allJobs.length}
        setSortByDate={setSortByDate}
        sortByDate={sortByDate}
        setPageNumber={setPageNumber}
      />

      <span>data coming from ('https://remotive.io/api/remote-jobs')</span>
      {renderingArrayFormation().map((singleJob: JOB) => (
        <SingleJob key={singleJob.id} jobInfo={singleJob} />
      ))}
      <div style={{marginBottom:"2rem", marginTop:"2rem"}}>
        <button onClick={() => changePageNumber("decrease")}> {"<"} </button>{" "}
        current-page: {pageNumber}{" "}
        <button onClick={() => changePageNumber("increase")}> {">"} </button>
      </div>
    </div>
  );
};

export default JobsList;
