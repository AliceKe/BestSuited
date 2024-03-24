const groupPostingsByCompany = (postings) => {
    let groups = {};

    for (let i = 0; i < postings.length; i++) {
        let p = postings[i];
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
    }

    return groups;

}
