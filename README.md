# LibraryManagementSystem
Library Management System API using NodeJS

<h1 align="center">Simple Library Management System API</h1>
 <h3>I have deployed this application here <a href="https://library-manage-system-api.herokuapp.com/"
   target="_blank">library-manage-system-api.herokuapp.com</a> you can check it
  using
  <a href="https://www.postman.com/" target="_blank">Postman</a>.
 </h3>
 <h3>The main entities are: </h3>
 <table>
  <tr>
   <td>
    <li>Users</li>
   </td>
   <td>
    <li>User_role</li>
   </td>

  </tr>
  <tr>
   <td>
    <li>Books</li>
   </td>
   <td>
    <li>Records</li>
   </td>
  </tr>
  <tr>
   <td>
    <li>Payments</li>
   </td>
  </tr>
 </table>
 <h3>Main tools and modules: </h3>
 <ul>
  <li>Node.js</li>
  <li>express</li>
  <li>PostgreSQL</li>
 </ul>
 <h3>Database schema: <a href="https://dbdesigner.page.link/KAYJqPVWcTuWNBXZA" target="_blank">click here</a></h3>

 <ul>
  <li>There are multiple books in the system.</li>
  <ul>
   <li>Each book has a unique ISBN.</li>
   <li>Each book has/has not multiple copies with a unique id for each copy.</li>
   <li>Relevant information shall be stored in the system.</li>
  </ul>
  <li>There are multiple users in the system.</li>
  <ul>
   <li>Each user has a unique id.</li>
   <li>Relevant information shall be stored in the system.</li>
   <li>Each user has a role.</li>
  </ul>
  <li>There are three user roles - Librarian, Student, Faculty.</li>
  <li>Librarians can edit, update, delete and read user, book, records, payment data.</li>
 </ul>
 <h3>Send access token in header</h3>
 <p>Key = auth_token</p>
 <p>Value = Token value</p>
 <h3>The API(s) are:</h3>
 <table style="width:100%">
  <tr>
   <th>Method</th>
   <th>Url</th>
   <th>Permission</th>
   <th>Data</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>Get</td>
   <td>/</td>
   <td>Public</td>
   <td>-</td>
   <td>Root Url</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/users</td>
   <td>Public</td>
   <td>{<br>
    "name" : String<sup>*</sup>,<br>
    "email" : email<sup>*</sup>,<br>
    "role" : String<sup>*</sup>,<br>
    "password" : String<sup>*</sup><br>
    }</td>
   <td>Create User</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/users/:id</td>
   <td>Librarian</td>
   <td>-</td>
   <td>Get user data using id</td>
  </tr>
  <tr>
   <td>Put</td>
   <td>/users/:id</td>
   <td>Librarian</td>
   <td>{<br>
    "name" : String,<br>
    "email" : email,<br>
    "role" : String,<br>
    "password" : String<br>
    }</td>
   <td>Update user data</td>
  </tr>
  <tr>
   <td>Delete</td>
   <td>/users/:id</td>
   <td>Librarian</td>
   <td>-</td>
   <td>Delete user by id</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/books</td>
   <td>Librarian</td>
   <td>{<br>
    "isbn" : String<sup>*</sup>,<br>
    "title" : String<sup>*</sup>,<br>
    "subject" : String<sup>*</sup>,<br>
    "description" : String,<br>
    "copies_available" : Integer,<br>
    "publish_date" : Date,<br>
    "pages" : Integer<br>
    }</td>
   <td>Add book</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/books/:id</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>-</td>
   <td>Get book details using id</td>
  </tr>
  <tr>
   <td>Put</td>
   <td>/books/:id</td>
   <td>Librarian</td>
   <td>{<br>
    "isbn" : String,<br>
    "title" : String,<br>
    "subject" : String,<br>
    "description" : String,<br>
    "copies_available" : Integer,<br>
    "publish_date" : Date,<br>
    "pages" : Integer<br>
    }</td>
   <td>Update book details</td>
  </tr>
  <tr>
   <td>Delete</td>
   <td>/books/:id</td>
   <td>Librarian</td>
   <td>-</td>
   <td>Delete book details</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/records</td>
   <td>Librarian</td>
   <td>{<br>
    "userid" : Integer<sup>*</sup>,<br>
    "bookid" : Integer<sup>*</sup>,<br>
    "issue_date" : Date,<br>
    "return_date" : Date,<br>
    "return_status" : Boolean<br>
    }</td>
   <td>Add record data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/records/:id</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>-</td>
   <td>Get records data</td>
  </tr>
  <tr>
   <td>Put</td>
   <td>/records/:id</td>
   <td>Librarian</td>
   <td>{<br>
    "userid" : Integer,<br>
    "bookid" : Integer,<br>
    "issue_date" : Date,<br>
    "return_date" : Date,<br>
    "return_status" : Boolean<br>
    }</td>
   <td>Update record data</td>
  </tr>
  <tr>
   <td>Delete</td>
   <td>/records/:id</td>
   <td>Librarian</td>
   <td>-</td>
   <td>Delete record data</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/payments</td>
   <td>Librarian</td>
   <td>{<br>
    "userid" : Integer<sup>*</sup>,<br>
    "amount" : Integer<sup>*</sup>,<br>
    "date" : Date<br>
    }</td>
   <td>Add payment data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/payments/:id</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>-</td>
   <td>Get payment data</td>
  </tr>
  <tr>
   <td>Put</td>
   <td>/payments/:id</td>
   <td>Librarian</td>
   <td>{<br>
    "userid" : Integer,<br>
    "amount" : Integer,<br>
    "date" : Date<br>
    }</td>
   <td>Update payment data</td>
  </tr>
  <tr>
   <td>Delete</td>
   <td>/payments/:id</td>
   <td>Librarian</td>
   <td>-</td>
   <td>Delete payment data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/users</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>{<br>
    search: {name: ‘test string’},<br>
    filter: {category: ‘student’},<br>
    sort: {name: ‘asc’, registration_date: ‘desc’}<br>
    }</td>
   <td>Data are optional<br>Search/get all user data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/books</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>{<br>
    search: {name: ‘test string’},<br>
    filter: {subject: ‘chemistry’},<br>
    sort: {name: ‘asc’, copies_available: ‘desc’}<br>
    }</td>
   <td>Data are optional<br>Search/get all book data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/records</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>-</td>
   <td>get all records data</td>
  </tr>
  <tr>
   <td>Get</td>
   <td>/payments</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>-</td>
   <td>Get all Payments data</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/users/getToken</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>{<br>
    "email" : email<sup>*</sup>,<br>
    "password" : String<sup>*</sup><br>
    }</td>
   <td>Log in to get an authorization token</td>
  </tr>
  <tr>
   <td>Post</td>
   <td>/users/refreshToken</td>
   <td>Librarian<br>Student<br>Faculty</td>
   <td>{<br>
    "Token" : String<sup>*</sup><br>
    }</td>
   <td>Pass expired token & Get<br> a renewed access token.<br>Refresh token validate 150 sec.</td>
  </tr>
 </table>
