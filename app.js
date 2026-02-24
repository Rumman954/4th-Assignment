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

let mainContainer, allJobsBtn, interviewBtn, rejectedBtn;
let totalCount, interviewCount, rejectedCount, jobCount;

let currentFilter = "all";
let interviewList = [];
let rejectedList = [];

function getStatusBadge(status) {
  if (status === "interview") {
    return `<span class="bg-green-100 text-green-600 text-xs px-3 py-1 rounded font-semibold">INTERVIEW</span>`;
  }
  if (status === "rejected") {
    return `<span class="bg-red-100 text-red-600 text-xs px-3 py-1 rounded font-semibold">REJECTED</span>`;
  }
  return `<span class="bg-blue-50 text-blue-500 text-xs px-3 py-1 rounded font-semibold">NOT APPLIED</span>`;
}

function syncLists() {
  interviewList = jobs.filter(job => job.status === "interview");
  rejectedList = jobs.filter(job => job.status === "rejected");
}

function updateCounters(filteredLength) {
  if (totalCount) totalCount.textContent = jobs.length;
  if (interviewCount) interviewCount.textContent = interviewList.length;
  if (rejectedCount) rejectedCount.textContent = rejectedList.length;
  if (jobCount) jobCount.textContent = filteredLength + " jobs";
}

function renderJobs() {
  if (!mainContainer) return;
  mainContainer.innerHTML = "";

  let filteredJobs;
  if (currentFilter === "all") {
    filteredJobs = jobs;
  } else {
    filteredJobs = jobs.filter(job => job.status === currentFilter);
  }

  syncLists();
  updateCounters(filteredJobs.length);

  if (filteredJobs.length === 0) {
    mainContainer.innerHTML = `
      <div class="min-h-[200px] flex items-center justify-center">
        <div class="text-center">
          <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-blue-100">
            <i class="fa-regular fa-file-lines text-4xl text-blue-500"></i>
          </div>
          <h2 class="text-xl font-semibold text-slate-800">
            No jobs available
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Check back soon for new job opportunities
          </p>
        </div>
      </div>
    `;
    return;
  }

  filteredJobs.forEach(function (job) {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-lg shadow-sm border border-slate-200 relative jobCard";
    card.dataset.id = job.id;

    card.innerHTML = `
      <button type="button"
        class="absolute cursor-pointer top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors deleteBtn">
        <i class="fa-solid fa-trash"></i>
      </button>
      <h3 class="text-lg font-bold text-slate-800 mb-1 jobName">${job.company}</h3>
      <p class="text-base text-slate-600 mb-2">${job.role}</p>
      <p class="text-sm text-slate-400 mb-3">
        ${job.location} - ${job.type} - ${job.salary}
      </p>
      <div class="mb-3 statusBadge">
        ${getStatusBadge(job.status)}
      </div>
      <p class="text-sm text-slate-800 mb-4 leading-relaxed">
        ${job.description}
      </p>
      <div class="flex gap-2 mt-4">
        <button type="button"
          class="px-3 py-1.5 text-xs bg-white border border-green-500 text-green-500 hover:bg-green-50 rounded font-medium transition-colors interviewBtn">
          INTERVIEW
        </button>
        <button type="button"
          class="px-3 py-1.5 text-xs bg-white border border-red-500 text-red-500 hover:bg-red-50 rounded font-medium transition-colors rejectedBtn">
          REJECTED
        </button>
      </div>
    `;

    mainContainer.appendChild(card);
  });
}

function setActiveTab(target) {
  [allJobsBtn, interviewBtn, rejectedBtn].forEach((btn) => {
    if (!btn) return;
    btn.classList.remove("bg-blue-600", "text-white", "hover:bg-blue-700", "active:bg-blue-800");
    btn.classList.add("bg-white", "text-slate-600", "border", "border-slate-300", "hover:bg-slate-100", "hover:border-slate-400", "hover:text-slate-800", "active:bg-slate-200");
  });

  if (!target) return;
  target.classList.remove("bg-white", "text-slate-600", "border", "border-slate-300", "hover:bg-slate-100", "hover:border-slate-400", "hover:text-slate-800", "active:bg-slate-200");
  target.classList.add("bg-blue-600", "text-white", "hover:bg-blue-700", "active:bg-blue-800");
}

function init() {
  mainContainer = document.getElementById("jobsContainer");
  allJobsBtn = document.querySelector('[data-filter="all"]');
  interviewBtn = document.querySelector('[data-filter="interview"]');
  rejectedBtn = document.querySelector('[data-filter="rejected"]');
  totalCount = document.getElementById("totalCount");
  interviewCount = document.getElementById("interviewCount");
  rejectedCount = document.getElementById("rejectedCount");
  jobCount = document.getElementById("jobCount");

  if (!mainContainer) return;

  allJobsBtn?.addEventListener("click", function () {
    currentFilter = "all";
    setActiveTab(allJobsBtn);
    renderJobs();
  });

  interviewBtn?.addEventListener("click", function () {
    currentFilter = "interview";
    setActiveTab(interviewBtn);
    renderJobs();
  });

  rejectedBtn?.addEventListener("click", function () {
    currentFilter = "rejected";
    setActiveTab(rejectedBtn);
    renderJobs();
  });

  mainContainer.addEventListener("click", function (event) {
    const card = event.target.closest(".jobCard");
    if (!card) return;

    const id = Number(card.dataset.id);
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    if (event.target.closest(".deleteBtn")) {
      if (currentFilter === "all") {
        const index = jobs.findIndex(j => j.id === id);
        if (index !== -1) jobs.splice(index, 1);
      } else {
        job.status = "pending";
      }
      renderJobs();
      return;
    }

    if (event.target.closest(".interviewBtn")) {
      job.status = "interview";
      renderJobs();
      return;
    }

    if (event.target.closest(".rejectedBtn")) {
      job.status = "rejected";
      renderJobs();
      return;
    }
  });

  setActiveTab(allJobsBtn);
  renderJobs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}