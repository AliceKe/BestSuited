import JobPostingCard from "./JobPostingCard"

const CompanyPostings = ({ company, data }) => {
    console.log("Postings " + data.postings)


    return (


        <div className="flex-col mt-3">
            <h3>{company}</h3>
            <div className="row">
                {data.postings.map((posting) => (<JobPostingCard key={posting} posting={posting} />))}
            </div>
        </div>

    )
}

export default CompanyPostings