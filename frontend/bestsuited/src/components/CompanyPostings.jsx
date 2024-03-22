import JobPostingCard from "./JobPostingCard"

const CompanyPostings = ({ company, data }) => {
    console.log("Postings " + data.postings)


    return (
        <div className="row">
            {data.postings.map((posting) => (<JobPostingCard posting={posting} />))}
        </div>
    )
}

export default CompanyPostings