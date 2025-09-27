
function toggleSkillsDropdown() {
  document.getElementById("skillsDropdown").classList.toggle("show");
}

function toggleUrgencyDropdown() {
  document.getElementById("urgencyDropdown").classList.toggle("show");
}

document.getElementById("skillsBtn").addEventListener("click", function(e) {
  e.stopPropagation();
  toggleSkillsDropdown();
});
document.getElementById("urgencyBtn").addEventListener("click", function(e) {
  e.stopPropagation();
  toggleUrgencyDropdown();
});

document.querySelectorAll("#urgencyDropdown a").forEach(function(el) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    const val = el.getAttribute("data-value");
    const text = el.textContent;
    document.getElementById("urgencyBtn").textContent = text + " ▼";
    document.getElementById("urgencyValue").value = val;
    document.getElementById("urgencyDropdown").classList.remove("show");
  });
});

window.addEventListener("click", function(event) {
  const skillDrop = document.getElementById("skillsDropdown");
  const urgDrop = document.getElementById("urgencyDropdown");

  if (skillDrop.classList.contains("show") && !event.target.matches('#skillsBtn')) {
    skillDrop.classList.remove("show");
  }
  if (urgDrop.classList.contains("show") && !event.target.matches('#urgencyBtn')) {
    urgDrop.classList.remove("show");
  }
});

document.getElementById("eventForm").addEventListener("submit", function(e) {
  let ok = true;

  const skillChecks = document.querySelectorAll("input[name='requiredSkills']:checked");
  if (skillChecks.length === 0) {
    document.getElementById("skillsError").style.display = "block";
    ok = false;
  } else {
    document.getElementById("skillsError").style.display = "none";
  }

  const urgVal = document.getElementById("urgencyValue").value;
  if (!urgVal) {
    document.getElementById("urgencyError").style.display = "block";
    ok = false;
  } else {
    document.getElementById("urgencyError").style.display = "none";
  }

  if (!ok) {
    e.preventDefault();
  }
});
