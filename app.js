
const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    role: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications using React Native.",
    status: "pending"
  },
  {
    id: 2,
    company: "WebFlow Agency",
    role: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Design and build websites using Webflow.",
    status: "pending"
  },
  {
    id: 3,
    company: "Startup Labs",
    role: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    description: "Work on modern frontend applications.",
    status: "pending"
  },
  {
    id: 4,
    company: "CloudNet Solutions",
    role: "Full Stack Developer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Develop scalable web applications using MERN stack.",
    status: "pending"
  },
  {
    id: 5,
    company: "AI Ventures",
    role: "Frontend Engineer",
    location: "Remote",
    type: "Contract",
    salary: "$70/hr - $90/hr",
    description: "Build UI components for AI-powered platforms.",
    status: "pending"
  },
  {
    id: 6,
    company: "Ecomify",
    role: "React Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Develop and maintain e-commerce frontend features.",
    status: "pending"
  },
  {
    id: 7,
    company: "FinTech Hub",
    role: "UI Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    description: "Create clean and accessible user interfaces for fintech apps.",
    status: "pending"
  },
  {
    id: 8,
    company: "DevStudio",
    role: "Junior Frontend Developer",
    location: "San Francisco, CA",
    type: "Internship",
    salary: "$60,000 - $75,000",
    description: "Assist in building responsive frontend applications.",
    status: "pending"
  }
];


//   DOM ELEMENTS oe getting them

const jobsContainer = document.getElementById("jobsContainer");
const jobTabs = document.querySelectorAll(".jobsbtn");
const jobCount = document.getElementById("jobCount");


//   APP STATE (current selected tab)

let currentFilter = "all";


  //STATUS BADGE FUNCTION

function getStatusBadge(status) {
  if (status === "interview") {
    return `<span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">INTERVIEW</span>`;
  }

  if (status === "rejected") {
    return `<span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-semibold">REJECTED</span>`;
  }

  return `<span class="bg-gray-300 text-gray-500 text-xs px-2 py-1 rounded font-semibold">NOT APPLIED</span>`;
}


//   RENDER JOBS (MAIN FUNCTION)

function renderJobs() {

  // Clear old content
  jobsContainer.innerHTML = "";

  // Filter jobs based on selected tab
  let filteredJobs;

  if (currentFilter === "all") {
    filteredJobs = jobs;
  } else {
    filteredJobs = jobs.filter(function (job) {
      return job.status === currentFilter;
    });
  }

  // Update job count
  jobCount.innerText = filteredJobs.length + " jobs";

  // Show empty state when no jobs are available
  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = `
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">

          <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100">
            <i class="fa-regular fa-file-lines text-4xl text-blue-500"></i>
          </div>

          <h2 class="text-xl font-semibold text-gray-800">
            No jobs available
          </h2>

          <p class="mt-1 text-sm text-gray-500">
            Check back soon for new job opportunities
          </p>
        </div>
      </div>
    `;
    return;
  }

  // Loop through jobs and create cards
  filteredJobs.forEach(function (job) {

    jobsContainer.innerHTML += `
      <div class="bg-white p-5 rounded-lg shadow relative">

        <!-- Delete Button -->
        <button 
          onclick="deleteJob(${job.id})"
          class="absolute cursor-pointer top-4 right-4 text-slate-400 hover:text-red-500">
          <i class="fa-solid fa-trash"></i>
        </button>

        <h3 class="font-semibold text-slate-800">${job.company}</h3>
        <p class="text-sm text-slate-600">${job.role}</p>

        <p class="text-xs text-slate-500 mt-1">
          ${job.location} • ${job.type} • ${job.salary}
        </p>

        <div class="mt-2">
          ${getStatusBadge(job.status)}
        </div>

        <p class="text-sm text-slate-600 mt-3">
          ${job.description}
        </p>

        <div class="flex gap-2 mt-4">
          <button
            onclick="updateStatus(${job.id}, 'interview')"
            class="px-3 py-1.5 text-xs border hover:bg-green-500 cursor-pointer border-green-500 text-green-700 rounded">
            INTERVIEW
          </button>

          <button
            onclick="updateStatus(${job.id}, 'rejected')"
            class="px-3 py-1.5 text-xs border hover:bg-red-500 cursor-pointer border-red-500 text-red-700 rounded">
            REJECTED
          </button>
        </div>
      </div>
    `;
  });
}


//   UPDATE JOB STATUS

function updateStatus(id, status) {

  const job = jobs.find(function (j) {
    return j.id === id;
  });

  job.status = status;
  renderJobs();
}

//  DELETE JOB

function deleteJob(id) {

  const index = jobs.findIndex(function (j) {
    return j.id === id;
  });

  jobs.splice(index, 1);
  renderJobs();
}


//   TAB CLICK LOGIC

jobTabs.forEach(function (tab) {

  tab.addEventListener("click", function () {

    // Remove active styles
    jobTabs.forEach(function (t) {
      t.classList.remove("bg-blue-600", "text-white");
    });

    // Add active style
    tab.classList.add("bg-blue-600", "text-white");

    // Update filter
    currentFilter = tab.dataset.filter;

    // Re-render
    renderJobs();
  });
});


renderJobs();