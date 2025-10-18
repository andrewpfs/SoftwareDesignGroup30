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

document.getElementById("eventForm").addEventListener("submit", async function(e) {
  e.preventDefault(); 
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

  if (!ok) return;

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/create-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message);
      this.reset();
      document.getElementById("urgencyBtn").textContent = "Select Urgency ▼";
    } else {
      alert("Error:\n" + result.errors.join("\n"));
    }
  } catch (err) {
    alert("Server error. Please try again later.");
    console.error(err);
  }
});
