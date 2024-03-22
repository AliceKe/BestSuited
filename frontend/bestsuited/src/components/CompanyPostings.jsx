import JobPostingCard from "./JobPostingCard"


const CompanyPostings = ({ company, data }) => {
    // console.log("Postings " + data.postings)
    if (!data || !data.postings) {
        return null; // Or any other fallback component or message
    }
    return (
        <div className="row">
            {/* {data.postings.map((posting, index) => (
               // console.log(posting);
               // console.log(index);
               < JobPostingCard key={index} posting={posting} />


           ))} */}
            {console.log(data.postings)}
            {data.postings.map((posting) => (<JobPostingCard key={posting.id} posting={posting} />))}
        </div>
    )
}




export default CompanyPostings
