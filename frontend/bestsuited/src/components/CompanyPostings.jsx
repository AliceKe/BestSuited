import JobPostingCard from "./JobPostingCard"

const CompanyPostings = ({ company, data }) => {
    console.log("Postings " + data.postings)


    return (
        <>
            {data.postings.map((posting) => (<JobPostingCard posting={posting} />))}
        </>
    )
}

export default CompanyPostings