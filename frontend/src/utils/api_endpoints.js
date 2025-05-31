//all api endpoints here
export const base_url = "http://localhost:4000/api/v1";


export const endpoints = {
  userLogin: "/auth/login/", //post
  userSignup: "/auth/signup/", //post
  getUser: "/users/get-user", //post
  updateUser: "/users/update-user", //put
  showAppliedJobs: "/users/get-applied-jobs", //post


  companyLogin : "/companies/login", //post
  companySignup: "/companies/signup", //post
  getSingleCompany : "/companies/", //get
  getJobList : "/companies/get-company-joblisting", //post
  getCompanyProfileInfo: "/companies/get-company", //get [Where did this come from?]
  getAllCompanies : "/companies/", //get
  updateCompanyProfile: "/companies/update-company", //Put
  

  uploadJob : "/jobs/upload-job", //Post
  updateJob : "/jobs/update-job", //Put
  findJobs : "/jobs/find-jobs", //Get
  deleteJobs : "/jobs/delete-job/:id", //Delete
  applyJobs : "/jobs/jobId/apply", //post
  showApplicants : "/jobs/:jobId/applicants", //Get

};
