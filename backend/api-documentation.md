# API Documentation

Base url : `http://{host}:{port}/api/v1`  
i.e `http://localhost:4000/api/v1/`

**Available APIs:**

[User APIs](#user-apis)  
[Company APIs](#company-apis)  
[Job APIs](#job-apis)

## User apis

### User signup

Method: `POST`, Endpoint: baseurl`/auth/signup`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "username": "Naomi123",
    "email": "Naomi123@test.com",
    "password": "12345678"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "message": "User created successfully",
    "user": {
        "username": "Naomi123",
        "email": "Naomi123@test.com"
    }
}
```
</details>

### login

Method: `POST`, Endpoint: baseurl`/auth/login`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "email": "Naomi1@test.com",
    "password": "12345678"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "message": "User logged in successfully",
    "success": true,
    "user": {
        "_id": "655f088edb9795049b50670d",
        "username": "Naomi1",
        "email": "Naomi1@test.com",
        "createdAt": "2023-11-23T08:08:46.312Z",
        "updatedAt": "2023-11-23T08:08:46.312Z",
        "__v": 0
    },
    "token": "jwt Token"
}
```
</details>

### Update User Profile

Method: `PUT`, Endpoint: baseurl`/users/update-user`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "firstName": "test fname",
    "lastName": "test lname",
    "email": "test1@test.com",
    "bio": "Testing bio"

}

````

</details>

<details>
<summary>JSON Response:</summary>

```json
{
    "sucess": true,
    "message": "User updated successfully",
    "user": {
        "_id": "65699400b90caac0d8b92588",
        "username": "test1",
        "email": "test1@test.com",
        "createdAt": "2023-12-01T08:06:24.826Z",
        "updatedAt": "2023-12-01T15:22:21.939Z",
        "__v": 0,
        "bio": "Testing bio",
        "firstName": "test fname",
        "lastName": "test lname",
        "applied": [
            "6569caf4f0a66bcc8ac9d5ae",
            "6569cff1caa6f047132132d6"
        ]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5OTQwMGI5MGNhYWMwZDhiOTI1ODgiLCJpYXQiOjE3MDE0NDQxNDIsImV4cCI6MTcwMTUzMDU0Mn0.yrYE6Gqzze9_mu0hmpShJDUV9EJfH3_D6QSIh_maApc"
}
````

</details>

### Get User

Method: `POST`, Endpoint: baseurl`/users/update-user`

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "user": {
    "_id": "65699400b90caac0d8b92588",
    "username": "test1",
    "email": "test1@test.com",
    "createdAt": "2023-12-01T08:06:24.826Z",
    "updatedAt": "2023-12-01T15:22:21.939Z",
    "__v": 0,
    "bio": "Testing bio",
    "firstName": "test fname",
    "lastName": "test lname",
    "applied": ["6569caf4f0a66bcc8ac9d5ae", "6569cff1caa6f047132132d6"]
  }
}
```

</details>


### Get Applied Jobs 

Method: `POST`, Endpoint: baseurl`/users/get-applied-jobs`


<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "message": "User created successfully",
    "user": {
        "username": "Naomi123",
        "email": "Naomi123@test.com"
    }
}
```
</details>



## Company apis

### signup

Method: `POST`, Endpoint: baseurl`/companies/signup`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "name": "testCompany",
    "email": "testCompany@gmail.com",
    "password": "12345678"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "message": "Company created successfully",
    "company": {
        "name": "testCompany",
        "email": "testCompany@gmail.com"
    },
    "token": "jwt token"
}
```
</details>

### login

Method: `POST`, Endpoint: baseurl`/companies/login`

<details>
<summary>Reqest body:</summary>
 
```json
{
    "email": "testCompany@gmail.com",
    "password": "12345678"
}
```
</details>

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "message": "Company logged in successfully",
    "company": {
        "_id": "656058ec6d21cb791020d691",
        "name": "testCompany",
        "email": "testCompany@gmail.com",
        "jobPosts": [
            "jobId",
            "jobId"
        ],
        "createdAt": "2023-11-24T08:03:56.073Z",
        "updatedAt": "2023-11-24T12:17:31.730Z",
        "__v": 0,
        "about": "Updated Company Description",
        "contact": "Updated Contact Information",
        "location": "Updated Location",
        "profileUrl": "Updated Profile URL"
    },
    "token": "jwt token"
}
```
</details>

### Get Single Company

Method: `GET`, Endpoint: baseurl`/companies/:id`

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "data": {
        "_id": "companyId",
        "name": "companyName",
        "email": "companyEmail",
        "jobPosts": [
            "jobId",
            "jobId"
        ],
        "createdAt": "2023-11-24T08:03:56.073Z",
        "updatedAt": "2023-11-24T12:17:31.730Z",
        "__v": 0,
        "about": "Updated Company Description",
        "contact": "Updated Contact Information",
        "location": "Updated Location",
        "profileUrl": "Updated Profile URL"
    }
}
```
</details>

### Get company joblisting

Method: `POST`, Endpoint: baseurl`/companies/get-company-joblisting`

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "company": {
    "_id": "companyId",
    "name": "company Name",
    "email": "company email",
    "password": "*******",
    "jobPosts": [
      {
        "_id": "jobId",
        "company": "companyId",
        "jobTitle": "Software Engineer",
        "jobType": "Full-time",
        "location": "Some Location",
        "salary": 10000,
        "vacancies": 1,
        "experience": 2,
        "detail": [
          {
            "desc": "Job description",
            "requirements": "Job requirements",
            "_id": "jobId"
          }
        ],
        "application": [],
        "createdAt": "2023-11-24T12:17:31.294Z",
        "updatedAt": "2023-11-24T12:21:08.570Z",
        "__v": 0
      }
    ],
    "createdAt": "2023-11-24T08:03:56.073Z",
    "updatedAt": "2023-11-24T12:17:31.730Z",
    "__v": 0,
    "about": "Updated Company Description",
    "contact": "Updated Contact Information",
    "location": "Updated Location",
    "profileUrl": "Updated Profile URL"
  }
}
```

</details>

### Get all companies

Method: `GET`, Endpoint: baseurl`/companies/`

<details>
<summary>JSON Response:</summary>
 
```json
{
    "success": true,
    "total": 1,
    "data": [
        {
            "_id": "companyid",
            "name": "companyName",
            "email": "company email",
            "jobPosts": [],
            "createdAt": "2023-11-24T08:03:33.057Z",
            "updatedAt": "2023-11-24T08:03:33.057Z",
            "__v": 0
        }
    ],
    "page": 1,
    "numOfPage": 1
}
```

</details>

### Update company

Method: `PUT`, Endpoint: baseurl`/companies/update-company`

<details>
<summary>Reqest body:</summary>
 
```json
{
"success": true,
"message": "Company Profile Updated SUccessfully",
"company": {
    "_id": "656058ec6d21cb791020d691",
    "name": "companyName",
    "email": "companyEmail",
    "jobPosts": [
        "65608cc4e7d66f1c8c9fab4a"
    ],
    "createdAt": "2023-11-24T08:03:56.073Z",
    "updatedAt": "2023-11-24T15:36:09.583Z",
    "__v": 0,
    "about": "Updated Company Description",
    "contact": "Updated Contact Information",
    "location": "Updated Location",
    "profileUrl": "Updated Profile URL"
    },
    "token": "jwt Token"
}
```

</details>

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "company": {
    "_id": "companyId",
    "name": "company Name",
    "email": "company email",
    "password": "*******",
    "jobPosts": [
      {
        "_id": "jobId",
        "company": "companyId",
        "jobTitle": "Software Engineer",
        "jobType": "Full-time",
        "location": "Some Location",
        "salary": 10000,
        "vacancies": 1,
        "experience": 2,
        "detail": [
          {
            "desc": "Job description",
            "requirements": "Job requirements",
            "_id": "jobId"
          }
        ],
        "application": [],
        "createdAt": "2023-11-24T12:17:31.294Z",
        "updatedAt": "2023-11-24T12:21:08.570Z",
        "__v": 0
      }
    ],
    "createdAt": "2023-11-24T08:03:56.073Z",
    "updatedAt": "2023-11-24T12:17:31.730Z",
    "__v": 0,
    "about": "Updated Company Description",
    "contact": "Updated Contact Information",
    "location": "Updated Location",
    "profileUrl": "Updated Profile URL"
  }
}
```

</details>

## Job apis

### Upload job

Method: `POST`, Endpoint: baseurl`/jobs/upload-job`

<details>
<summary>Reqest body:</summary>
 
```json
{
  "jobTitle": "Frontend Engineer",
  "jobType": "Part-Time",
  "location": "Some Location",
  "salary": "50000",
  "vacancies": 5,
  "experience": "2",
  "desc": "Job description",
  "requirements": "Job requirements"
}

````
</details>

<details>
<summary>JSON Response:</summary>

```json
{
    "success": true,
    "message": "Job Posted Successfully",
    "job": {
        "company": "656058ec6d21cb791020d691",
        "jobTitle": "Frontend Engineer",
        "jobType": "Part-Time",
        "location": "Some Location",
        "salary": 50000,
        "vacancies": 5,
        "experience": 2,
        "detail": [
            {
                "desc": "Job description",
                "requirements": "Job requirements",
                "_id": "6560c5019bfe6e6100659189"
            }
        ],
        "application": [],
        "_id": "6560c5019bfe6e6100659188",
        "createdAt": "2023-11-24T15:45:05.152Z",
        "updatedAt": "2023-11-24T15:45:05.152Z",
        "__v": 0
    }
}
````

</details>

### Update job

Method: `PUT`, Endpoint: baseurl`/jobs/update-job`

<details>
<summary>Reqest body:</summary>
 
```json
{
  "jobTitle": "Software Engineer",
  "jobType": "Full-time",
  "location": "Some Location",
  "salary": "10000",
  "vacancies": 1,
  "experience": "2",
  "desc": "Job description",
  "requirements": "Job requirements"
}

````
</details>

<details>
<summary>JSON Response:</summary>

```json
{
    "success": true,
    "message": "Job Post Updated Successfully",
    "jobPost": {
        "jobTitle": "Software Engineer",
        "jobType": "Full-time",
        "location": "Some Location",
        "salary": "10000",
        "vacancies": 1,
        "experience": "2",
        "detail": {
            "desc": "Job description",
            "requirements": "Job requirements"
        },
        "_id": "6560945b6743e08fa94f17ce"
    }
}
````

</details>

### Find Jobs

Method: `GET`, Endpoint: baseurl`/jobs/find-jobs`

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "totalJobs": 1,
  "data": [
    {
      "_id": "6560945b6743e08fa94f17ce",
      "company": {
        "_id": "656058ec6d21cb791020d691",
        "name": "jalil123@gmail.com",
        "email": "jalil123@gmail.com",
        "jobPosts": [
          "65608cc4e7d66f1c8c9fab4a",
          "656093ee6743e08fa94f17c5",
          "6560945b6743e08fa94f17ce",
          "6560c5019bfe6e6100659188"
        ],
        "createdAt": "2023-11-24T08:03:56.073Z",
        "updatedAt": "2023-11-24T15:45:05.350Z",
        "__v": 0,
        "about": "Updated Company Description",
        "contact": "Updated Contact Information",
        "location": "Updated Location",
        "profileUrl": "Updated Profile URL"
      },
      "jobTitle": "Software Engineer",
      "jobType": "Full-time",
      "location": "Some Location",
      "salary": 10000,
      "vacancies": 1,
      "experience": 2,
      "detail": [
        {
          "desc": "Job description",
          "requirements": "Job requirements",
          "_id": "6560c5879bfe6e610065918d"
        }
      ],
      "application": [],
      "createdAt": "2023-11-24T12:17:31.294Z",
      "updatedAt": "2023-11-24T15:47:19.518Z",
      "__v": 0
    }
  ],
  "page": 1,
  "numOfPage": 1
}
```

</details>

### Delete Jobs

Method: `DELETE`, Endpoint: baseurl`/jobs/delete-job/:id`

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "message": "Job Post Deleted Successfully."
}
```

</details>

### Apply To Jobs

Method: `POST`, Endpoint: baseurl`/jobs/jobId/apply`

<details>
<summary>JSON Response:</summary>

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "job": {
    "_id": "6569cff1caa6f047132132d6",
    "company": "6569c996f0a66bcc8ac9d5ac",
    "jobTitle": "Job2",
    "jobType": "Full-Time",
    "location": "Dhaka",
    "salary": 10000,
    "experience": 0,
    "detail": [
      {
        "desc": "efnjend",
        "requirements": "ebde",
        "_id": "6569cff1caa6f047132132d7"
      }
    ],
    "applicants": ["65699400b90caac0d8b92588"],
    "createdAt": "2023-12-01T12:22:09.243Z",
    "updatedAt": "2023-12-01T13:51:03.930Z",
    "__v": 1
  }
}
```

</details>
