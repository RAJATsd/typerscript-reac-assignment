const API_ENDPOINT = "https://remotive.io/api/remote-jobs";

export const fetchAllJobs = async () => {
  try {
    const allJobs = await fetch(API_ENDPOINT);
    const data = await allJobs.json();
    return data;
  } catch (e) {
    console.log("nothing to show");
    return {
      "0-legal-notice": "anbasd",
      "job-count": 0,
      jobs: [],
    };
  }
};

export const fetchJobsByCategory = async (category:string) => {
  try {
    const extendedEndpoint = `${API_ENDPOINT}?category=${category}`;
    const allJobs = await fetch(extendedEndpoint);
    const data = await allJobs.json();
    return data;
  } catch (e) {
    console.log("nothing to show");
    return {
      "0-legal-notice": "anbasd",
      "job-count": 0,
      jobs: [],
    };
  }
};

export const fetchJobsByCompany = async (company:string) => {
    try {
      const extendedEndpoint = `${API_ENDPOINT}?company_name=${company}`;
      const allJobs = await fetch(extendedEndpoint);
      const data = await allJobs.json();
      return data;
    } catch (e) {
      console.log("nothing to show");
      return {
        "0-legal-notice": "anbasd",
        "job-count": 0,
        jobs: [],
      };
    }
  };

  export const fetchJobsByInput = async (input:string) => {
    try {
      const extendedEndpoint = `${API_ENDPOINT}?search=${input}`;
      const allJobs = await fetch(extendedEndpoint);
      const data = await allJobs.json();
      return data;
    } catch (e) {
      console.log("nothing to show");
      return {
        "0-legal-notice": "anbasd",
        "job-count": 0,
        jobs: [],
      };
    }
  };
