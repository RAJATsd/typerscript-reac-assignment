import "./jobs-info-and-filtering.css";
import React, { useState } from "react";
import { JOB, JOB_API } from "../../interfaces/job";
import {
  fetchJobsByCategory,
  fetchJobsByCompany,
  fetchJobsByInput,
} from "../../api/jobs";

interface Props {
  totalNumberOfJobs: number;
  allCompanyNames: string[];
  allCategoryNames: string[];
  setAllJobs: (value: React.SetStateAction<JOB[]>) => void;
  setSortByDate: (value: React.SetStateAction<boolean>) => void;
  jobsFoundBySearch: number;
  sortByDate: boolean;
  setPageNumber:(value: React.SetStateAction<number>) => void;
}

const JobsInfoAndFiltering: React.FC<Props> = ({
  allCompanyNames,
  allCategoryNames,
  totalNumberOfJobs,
  jobsFoundBySearch,
  setAllJobs,
  sortByDate,
  setSortByDate,
  setPageNumber
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleCompanyNameChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fetchedJobsByCompany: JOB_API = await fetchJobsByCompany(
      event.target.value
    );
    setAllJobs(fetchedJobsByCompany.jobs);
    setPageNumber(1);
  };
  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fetchedJobsByCategory: JOB_API = await fetchJobsByCategory(
      event.target.value
    );
    setAllJobs(fetchedJobsByCategory.jobs);
    setPageNumber(1);
  };

  const handleSearchByInput = async () => {
    const fetchedJobsByInput: JOB_API = await fetchJobsByInput(inputValue);
    setAllJobs(fetchedJobsByInput.jobs);
    setPageNumber(1);
  };

  return (
    <div className="jobs-info-and-filters-container">
      <div className="numbers-holders">
        <span className="total-jobs">
          Total Jobs Found : <b>{totalNumberOfJobs}</b>{" "}
        </span>
        <span className="jobs-by-search">
          Jobs According to Search : <b>{jobsFoundBySearch}</b>{" "}
        </span>
      </div>
      <h4 style={{ marginBottom: 0 }}>Search By</h4>
      <div className="select-holder">
        {allCompanyNames.length > 0 && (
          <select
            className="filtering-select"
            onChange={handleCompanyNameChange}
            defaultValue=""
          >
            <option value=""> select a company </option>
            {allCompanyNames.map((singleCompany: string) => (
              <option key={singleCompany} value={singleCompany}>
                {singleCompany}
              </option>
            ))}
          </select>
        )}
        {allCategoryNames.length > 0 && (
          <select
            className="filtering-select"
            defaultValue=""
            onChange={handleCategoryChange}
          >
            <option value="" selected>
              {" "}
              select a category{" "}
            </option>
            {allCategoryNames.map((singleCategory: string) => (
              <option key={singleCategory} value={singleCategory}>
                {singleCategory}
              </option>
            ))}
          </select>
        )}
      </div>
      <span className="input-and-button-holder">
        <input
          type="text"
          className="search-input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="type and search by title or description (empty and search for all jobs)"
          style={{ width: "30rem" }}
        />
        <button onClick={handleSearchByInput}>Search</button>
      </span>
      <div>
        <button
          onClick={(event) => setSortByDate(!sortByDate)}
          className={`sorting-button ${sortByDate ? "sorted" : ""}`}
        >
          sort by date
        </button>
      </div>
    </div>
  );
};

export default JobsInfoAndFiltering;
