export const backendUrl = {
    local: "http://127.0.0.1:5000",
    remote: "http://4300showcase.infosci.cornell.edu:5185"
}

export const groupPostingsByCompany = (postings) => {
    let groups = {};

    postings.forEach(p => {
        let company = p["company"];

        if (company in groups) {
            groups[company]["postings"].push(p);
        } else {
            groups[company] = {
                "name": company,
                "description": p["description"],
                "rating": p["rating"],
                "happiness": p["happiness"],
                "postings": [p]
            };
        }
    });

    return groups;
}
