import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Authenticate User **/
  static async authenticateUser(username, password) {
    
      console.log(username);
      console.log(password);
    const userCreds = { username: username, password: password };
    let res = await this.request(`auth/token`, userCreds, "post");
    this.token = res.token;
    return this.token;
  }
  /** Register User **/
  static async registerUser({username,firstName,lastName,password,email}){
    const userInfo = { 
      username: username, 
      firstName: firstName, 
      lastName: lastName,
      password: password,
      email: email
    }
    let res = await this.request(`auth/register`,userInfo,"post");
    this.token = res.token;
    return this.token;
  }
  // /** Get User Details **/
  // static async getUser(username) {
  //   let res = await this.request(`users/${username}`);
  //   return res.user;
  // }
  /** Patch User Details **/
  static async patchUser(formData) {
    try {
      const token = await this.authenticateUser(formData.username, formData.password);
      if (typeof token === "string") {
        const userInfo = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }
        let res = await this.request(`users/${formData.username}`, userInfo, "patch");
        return res.user;
      }
    } catch(err) {
      return err; 
    }
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  /** Get all companies**/
  static async getCompanies(searchStr) {
    const nameParam = searchStr !== "" ? { name: searchStr } : {};
    let res = await this.request(`companies`, nameParam);
    return res.companies;
  }

  /** Get details on a job by handle **/
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
  /** Get details on all jobs **/
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }
  /** Apply for job **/
  static async applyForJob(userName, jobId) {
    let res = await this.request(`users/${userName}/jobs/${jobId}`, {}, "post");
    const appliedStatus = res.applied === 1 ? true : false;
    return appliedStatus;
  }
  /** Add new user, return token **/
  static async addUser(formData) {
    // formData object includes username, firstName, lastName, password, email, isAdmin
    let res = await this.request(`users`, formData, "post");
    return res.token;
  }

  /** Get user info **/
  static async getUser(user) {
    let res = await this.request(`users/${user}`);
    let { username, firstName, lastName, email } = res.user;
    return {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
  }
  /** Update user **/
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;