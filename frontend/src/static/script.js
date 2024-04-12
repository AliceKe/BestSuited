export const backendUrl = {
  local: "http://127.0.0.1:5000",
  remote: "http://4300showcase.infosci.cornell.edu:5185",
};

export const groupPostingsByCompany = (postings) => {
  let groupsMap = {};

  postings.forEach((p) => {
    let company = p["company"];

    if (company in groupsMap) {
      groupsMap[company]["postings"].push(p);
    } else {
      groupsMap[company] = {
        name: company,
        description: p["description"],
        rating: p["rating"],
        happiness: p["happiness"],
        postings: [p],
      };
    }
  });

  let groups = Object.values(groupsMap);

  return groups;
};

export const companiesSortBy = (companies, sortParam) => {
  let sortedCompanies = [...companies];

  if (sortParam === "Rating") {
    sortedCompanies.sort((a, b) => {
      const ratingA = parseFloat(a.postings[0].rating);
      const ratingB = parseFloat(b.postings[0].rating);
      return ratingB - ratingA;
    });
  } else if (sortParam === "Name") {
    sortedCompanies.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  return sortedCompanies;
};

export const jobsSortBy = (jobs, sortParam) => {
  let sortedJobs = [...jobs];

  if (sortParam === "Role") {
    sortedJobs.sort((a, b) => {
      const roleA = a.role.toLowerCase();
      const roleB = b.role.toLowerCase();
      return roleA.localeCompare(roleB);
    });
  } else if (sortParam === "Rank") {
    sortedJobs.sort((a, b) => {
      const rankA = parseFloat(a.rank);
      const rankB = parseFloat(b.rank);
      return rankB - rankA;
    });
  }

  return sortedJobs;
};
