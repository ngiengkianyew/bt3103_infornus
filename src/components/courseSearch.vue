<template>
<body id="searchTable">
  <div class="searchBar">
    <b-jumbotron text-variant="white" class="jumbo">
      <template slot="header" class="text-center">Search for available courses:</template>
      <template slot="lead">More than 100 courses available here.</template>
      <input type="text" v-model="search" id="myInput" placeholder="Search Courses" class="search">
      <div>
        <br>
        <b-button v-b-toggle.collapse-1 variant="primary">Filter by faculty</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <p class="card-text"></p>
            <div v-for="option in options" :key="option.text" class="filter-options">
              <input type="radio" v-model="selected" :value="option.text">
              {{ option.text }}
            </div>
          </b-card>
        </b-collapse>
      </div>
    </b-jumbotron>
  </div>
  <table id="myTable">
    <thead>
      <tr>
        <th style="width:20%;">Course</th>
        <th style="width:20%;">Faculty</th>
        <th style="width:20%;">% of Students with Honors (Highest Distinction)</th>
        <th style="width:20%;">% of Students with Honors (Distinction)</th>
        <th style="width:20%;">Starting Salary ($ per month)</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(course, idx) in selectedCourses" :key="idx">
        <router-link
          v-bind:to="{name:'courseDashboard', params: {course_name: course.course_name}}"
        >{{ course.course_name }}</router-link>
        <td>{{ course.home_faculty }}</td>
        <td>{{ course.first_class }}</td>
        <td>{{ course.second_class }}</td>
        <td>{{ course.starting_salary }}</td>
      </tr>
    </tbody>
    <br>
    <br>
  </table>
</body>
</template>

<script>
import db from "../firebase.js";

export default {
  name: "courseSearch",
  firebase: function() {
    return {
      courses: db.ref("course_admin_info/data")
    };
  },
  data() {
    return {
      search: "",
      selected: "all",
      options: [
        { text: "All Faculties", value: "all" },
        { text: "School of Business", value: "Business" },
        { text: "School of Computing", value: "Computing" },
        {
          text: "School of Design and Environment",
          value: "design and environment"
        },
        { text: "Arts & Social Sciences", value: "Social Sciences" },
        { text: "Science", value: "Science" },
        { text: "Engineering", value: "Engineering" },
        { text: "Law", value: "Law" },
        { text: "Others", value: "Others" }
      ]
    };
  },
  computed: {
    category: function() {
      if (this.selected === "School of Business") return "School of Business";
      else if (this.selected === "School of Computing")
        return "School of Computing";
      else if (this.selected === "School of Design and Environment")
        return "School of Design and Enviornment";
      else if (this.selected === "Arts & Social Sciences")
        return "Faculty of Arts and Social Sciences";
      else if (this.selected === "Science") return "Faculty of Science";
      else if (this.selected === "Law") return "Law Faculty";
      else if (this.selected === "Engineering") return "Engineering";
      else return "";
    },

    selectedCourses: function() {
      return this.courses.filter(course => this.searchFunction(course));
    }
  },

  methods: {
    searchFunction: function(course) {
      let catMatch =
        this.category == ""
          ? true
          : course.home_faculty.toLowerCase() == this.category.toLowerCase();

      let nameMatch = course.course_name
        .toLowerCase()
        .includes(this.search.toLowerCase());
      let facultyMatch = course.home_faculty
        .toLowerCase()
        .includes(this.search.toLowerCase());

      return nameMatch | facultyMatch && catMatch;
    }
  }
};
</script>

<style>
.searchBar {
  padding-top: 50px;
}
.jumbo {
  background-color: #EF7C00;
}
.search {
  width: 800px;
  height: 45px;
}
.filter-options {
  color: black;
}
</style>
