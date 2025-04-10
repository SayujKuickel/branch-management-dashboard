import { axiosBaseURL, getAuthHeader } from "./config";

export const ApiUrlMappings = {
  student: "/students",
  branch: "/branch",
  stats: "/misc/stats",
};

export const GET_ApiRequest = (
  url,
  id,
  page = 0,
  limit = 5,
  otherQueries = []
) => {
  let formattedUrl = url;

  if (id) {
    formattedUrl += `/${id}`;
  } else {
    let params = [];
    if (page) params.push(`page=${page}`);
    if (limit) params.push(`limit=${limit}`);

    if (otherQueries) {
      otherQueries.forEach((item) => {
        params.push(item);
      });
    }

    if (params.length > 0) {
      formattedUrl += `?${params.join("&")}`;
    }
  }

  // console.log(`\n[GET]\t`, formattedUrl, "\n");

  return axiosBaseURL.get(formattedUrl, {
    headers: getAuthHeader(),
  });
};

export const PATCH_ApiRequest = (url, id, payload) => {
  return axiosBaseURL.patch(`${url}/${id}`, payload, {
    headers: getAuthHeader(),
  });
};
//
//
//
//
//

// STUDENT
export const GET_Student = (id, optionMode, branch_id) => {
  let url = ApiUrlMappings.student;

  if (id) {
    url += `/${id}`;
  } else if (optionMode) {
    url += `/options`;
  } else {
    let params = [];

    if (branch_id) params.push(`branch_id=${branch_id}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }
  }

  return axiosBaseURL.get(url, {
    headers: getAuthHeader(),
  });
};

export const POST_Student = (payload) => {
  return axiosBaseURL.post(ApiUrlMappings.student, payload, {
    headers: getAuthHeader(),
  });
};

export const PATCH_Student = (id, payload) => {
  return axiosBaseURL.patch(`${ApiUrlMappings.student}/${id}`, payload, {
    headers: getAuthHeader(),
  });
};

export const DELETE_Student = (id) => {
  return axiosBaseURL.delete(`${ApiUrlMappings.student}/${id}`, {
    headers: getAuthHeader(),
  });
};

// BRANCH
export const GET_Branch = (id, optionMode) => {
  let url = ApiUrlMappings.branch;

  if (id) {
    url += `/${id}`;
  } else if (optionMode) {
    url += `/options`;
  } else {
    let params = [];

    // if (branch_id) params.push(`branch_id=${branch_id}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }
  }
  return axiosBaseURL.get(url, {
    headers: getAuthHeader(),
  });
};

export const POST_Branch = (payload) => {
  return axiosBaseURL.post(ApiUrlMappings.branch, payload, {
    headers: getAuthHeader(),
  });
};

export const PATCH_Branch = (id, payload) => {
  return axiosBaseURL.patch(`${ApiUrlMappings.branch}/${id}`, payload, {
    headers: getAuthHeader(),
  });
};

export const DELETE_Branch = (id) => {
  return axiosBaseURL.delete(`${ApiUrlMappings.branch}/${id}`, {
    headers: getAuthHeader(),
  });
};

export const Login = (payload) => {
  return axiosBaseURL.post(`/auth/login`, payload);
};
export const GET_Stats = () => {
  return axiosBaseURL.get(ApiUrlMappings.stats, {
    headers: getAuthHeader(),
  });
};
