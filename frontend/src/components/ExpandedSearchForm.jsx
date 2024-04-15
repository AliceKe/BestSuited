import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap/';
import { backendUrl } from "../static/script";


import MultiSelect from './MultiSelect';
import SortSlider from './FilterSlider';




const ExpandedSearchForm = ({ updateFilteredPostings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState([]);

  const [selectedJobs, setSelectedJobs] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([]);

  const [filteredPostings, setFilteredPostings] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);

  const defaultSalaryRange = localStorage.getItem('salaryRange') || [0, 300000];
  const [salaryRange, setSalaryRange] = useState(defaultSalaryRange);

  const [allRoles, setAllRoles] = useState([]);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await fetch(`${backendUrl.remote}/regular?`);
  //       const data = await response.json();
  //       console.log(data)
  //       const rolesSet = new Set();
  //       const locationSet = new Set();
  //       const skillSet = new Set();
  //       Object.entries(data.postings).forEach(company => {
  //         rolesSet.add(company[1].role);
  //         locationSet.add(`${company[1].city}, ${company[1].country}`);
  //         skillSet.add(company[1].skills);
  //       })
  //       const suggestedJobs = Array.from(rolesSet).map(role => ({ title: role }));
  //       setAllRoles(suggestedJobs)
  //     } catch (error) {
  //       console.error('Error fetching roles:', error);
  //     }
  //   };

  //   fetchRoles();
  // }, []);

  const toggleFormVisibility = () => {
    setIsExpanded(!isExpanded);
  };


  const fetchData = async () => {
    try {
      const minSalary = salaryRange[0];
      const maxSalary = salaryRange[1];
      // const queryParams = new URLSearchParams({
      //   jobTitle: selectedJobs.join(','),
      //   location: selectedLocation.join(','),
      //   skill: selectedSkill.join(',')
      // });
      // console.log(Object.fromEntries(queryParams));
      // const response = await fetch(`${backendUrl.remote}/regular?q=${queryParams}`);

      // const queryParams = new URLSearchParams();
      // queryParams.append("q", `jobTitle=${selectedJobs.join(',')}&location=${selectedLocation.join(',')}&skill=${selectedSkill.join(',')}`);
      // queryParams.append("jobTitle", selectedJobs.join(','));
      // queryParams.append("location", selectedLocation.join(','));
      // queryParams.append("skill", selectedSkill.join(','));


      let queryParams = '';
      if (selectedJobs.length > 0) {
        queryParams += `${encodeURIComponent(selectedJobs.join(','))}&`;
      }
      if (selectedLocation.length > 0) {
        queryParams += `${selectedLocation.join(',')}&`;
      }
      if (selectedSkill.length > 0) {
        console.log(selectedSkill)
        selectedSkill.forEach(skill => {
          queryParams += `${skill}&`;
        });
      }
      queryParams = queryParams.replace(/&$/, '');

      console.log(`${backendUrl.remote}/regular?q=${queryParams}`);
      const response = await fetch(`${backendUrl.remote}/regular?q=${queryParams}`);

      const data = await response.json();
      console.log(data);

      let filteredPostings = [];
      Object.entries(data.postings).forEach(company => {
        // console.log(company);
        const jobTitleMatch = selectedJobs.length === 0 || company[1].role.includes(selectedJobs);
        const locationMatch = selectedLocation.length === 0 || selectedLocation.includes(`${company[1].city}, ${company[1].country}`);
        const skillMatch = selectedSkill.length === 0 || selectedSkill.some(skill => (company[1].skills).toLowerCase().includes(skill.toLowerCase()));
        const salaryRangeString = company[1]['salary range'];
        const salaryRangeArray = salaryRangeString.split('-');
        const minPostingSalary = parseFloat(salaryRangeArray[0].replace('$', '').replace('K', '000'));
        const maxPostingSalary = parseFloat(salaryRangeArray[1].replace('$', '').replace('K', '000'));
        const salaryMatch = salaryRange.length === 0 || (minSalary <= minPostingSalary && maxSalary >= maxPostingSalary);

        if (jobTitleMatch && locationMatch && skillMatch && salaryMatch) {
          filteredPostings.push(company[1]); // pushing the company object, not the 'posting' variable
        }
      });

      setFilteredPostings(filteredPostings); // setting the state with filteredPostings
      updateFilteredPostings(filteredPostings); // updating any other function or state with filteredPostings
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  const suggestedJobs = [
    { 'title': 'Financial Analyst' }, { 'title': 'Office Coordinator' }, { 'title': 'Tax Accountant' }, { 'title': 'General Pediatrician' }, { 'title': 'Project Coordinator' }, { 'title': 'Network Administrator' }, { 'title': 'Social Media Analyst' }, { 'title': 'Data Scientist' }, { 'title': 'Environmental Consultant' }, { 'title': 'Market Research Coordinator' }, { 'title': 'Environmental Planner' }, { 'title': 'JavaScript Developer' }, { 'title': 'Java Software Engineer' }, { 'title': 'Litigation Paralegal' }, { 'title': 'Personal Tax Consultant' }, { 'title': 'Employment Lawyer' }, { 'title': 'Procurement Coordinator' }, { 'title': 'Tax Planner' }, { 'title': 'Real Estate Paralegal' }, { 'title': 'Pediatric Speech Therapist' }, { 'title': 'Clinical Nurse Specialist' }, { 'title': 'Litigation Support Specialist' }, { 'title': 'Industrial Engineer' }, { 'title': 'Documentation Specialist' }, { 'title': 'Investment Portfolio Manager' }, { 'title': 'Frontend Web Developer' }, { 'title': 'E-commerce Web Designer' }, { 'title': 'Family Law Attorney' }, { 'title': 'Performance Testing Specialist' }, { 'title': 'Digital Marketing Director' }, { 'title': 'Employee Relations Specialist' }, { 'title': 'Accessibility Developer' }, { 'title': 'Email Marketing Specialist' }, { 'title': 'Demand Planner' }, { 'title': 'Logistics Analyst' }, { 'title': 'Brand Director' }, { 'title': 'Account Manager' }, { 'title': 'Nurse Educator' }, { 'title': 'DevOps Engineer' }, { 'title': 'Key Account Manager' }, { 'title': 'Acute Care Nurse Practitioner' }, { 'title': 'Inventory Control Specialist' }, { 'title': 'Sales Trainer' }, { 'title': 'Product Designer' }, { 'title': 'Territory Sales Manager' }, { 'title': 'Creative Copywriter' }, { 'title': 'Primary Care Physician Assistant' }, { 'title': 'Sourcing Analyst' }, { 'title': 'Product Demonstrator' }, { 'title': 'Research and Development (R&D) Engineer' }, { 'title': 'HVAC Systems Designer' }, { 'title': 'Brand Promoter' }, { 'title': 'SEM Analyst' }, { 'title': 'Residential Landscape Designer' }, { 'title': 'Frontend Web Designer' }, { 'title': 'Design Engineer' }, { 'title': 'In-House Counsel' }, { 'title': 'Mediator' }, { 'title': 'Quality Control Analyst' }, { 'title': 'Operations Director' }, { 'title': 'Backend Developer' }, { 'title': 'Retirement Planner' }, { 'title': 'Call Center Agent' }, { 'title': 'Court Clerk' }, { 'title': 'Automation Tester' }, { 'title': 'Procurement Manager' }, { 'title': 'Network Performance Analyst' }, { 'title': 'Deliverability Analyst' }, { 'title': 'Primary Care Nurse Practitioner' }, { 'title': 'Commercial Interior Designer' }, { 'title': 'Big Data Engineer' }, { 'title': 'Legal Counsel' }, { 'title': 'Database Developer' }, { 'title': 'Research Psychologist' }, { 'title': 'Media Relations Specialist' }, { 'title': 'Adult Speech Therapist' }, { 'title': 'Security Operations Center (SOC) Analyst' }, { 'title': 'Structural Engineer' }, { 'title': 'Marketing Communications Director' }, { 'title': 'Geriatric Physical Therapist' }, { 'title': 'Wealth Management Advisor' }, { 'title': 'Electrical Engineer' }, { 'title': 'Administrative Assistant' }, { 'title': 'Conference Manager' }, { 'title': 'Event Planner' }, { 'title': 'Network Security Specialist' }, { 'title': 'Treasury Manager' }, { 'title': 'Server Developer' }, { 'title': 'IT Business Analyst' }, { 'title': 'Human Resources Director' }, { 'title': 'School Psychologist' }, { 'title': 'Sales Team Leader' }, { 'title': 'Data Analyst' }, { 'title': 'Child Welfare Worker' }, { 'title': 'Usability Analyst' }, { 'title': 'Market Expansion Manager' }, { 'title': 'Data Engineer' }, { 'title': 'International Tax Consultant' }, { 'title': 'Sales Account Executive' }, { 'title': 'Subject Matter Expert' }, { 'title': 'Content SEO Strategist' }, { 'title': 'Search Engine Marketer' }, { 'title': 'Brand Strategist' }, { 'title': 'Content Creator' }, { 'title': 'Database Administrator' }, { 'title': 'API Developer' }, { 'title': 'SEO Specialist' }, { 'title': 'Procurement Specialist' }, { 'title': 'Training Coordinator' }, { 'title': 'Enterprise Architect' }, { 'title': 'Sustainability Specialist' }, { 'title': 'Research Analyst' }, { 'title': 'Brand Marketing Analyst' }, { 'title': 'User Researcher' }, { 'title': 'UI/UX Front-End Developer' }, { 'title': 'Content Writer' }, { 'title': 'Java Web Application Developer' }, { 'title': 'Wedding Designer' }, { 'title': 'Architectural Drafter' }, { 'title': 'Research Chemist' }, { 'title': 'Technical Writer' }, { 'title': 'Agile Project Manager' }, { 'title': 'Architectural Designer' }, { 'title': 'Pediatric Nurse Practitioner' }, { 'title': 'Technical Copywriter' }, { 'title': 'Data Entry Specialist' }, { 'title': 'Geriatric Occupational Therapist' }, { 'title': 'Supply Chain Coordinator' }, { 'title': 'Urban Planner' }, { 'title': 'Help Desk Analyst' }, { 'title': 'Wedding Coordinator' }, { 'title': 'Sustainable Design Specialist' }, { 'title': 'Logistics Manager' }, { 'title': 'Periodontal Therapist' }, { 'title': 'Print Graphic Designer' }, { 'title': 'Addiction Counselor' }, { 'title': 'Corporate Event Coordinator' }, { 'title': 'Analytical Chemist' }, { 'title': 'Clinical Psychologist' }, { 'title': 'Purchasing Coordinator' }, { 'title': 'Corporate Litigator' }, { 'title': 'Financial Accountant' }, { 'title': 'Quality Assurance Manager' }, { 'title': 'Social Media Influencer' }, { 'title': 'Special Education Teacher' }, { 'title': 'Digital Marketing Manager' }, { 'title': 'Construction Engineer' }, { 'title': 'Automation Test Engineer' }, { 'title': 'Recruitment Coordinator' }, { 'title': 'NoSQL Database Engineer' }, { 'title': 'Desktop Support Technician' }, { 'title': 'Equine Veterinarian' }, { 'title': 'Medical Sales Specialist' }, { 'title': 'Agile Product Owner' }, { 'title': 'Family Counselor' }, { 'title': 'Marketing Automation Specialist' }, { 'title': 'Service Quality Assurance Manager' }, { 'title': 'Business Intelligence Analyst' }, { 'title': 'Sustainable Landscape Specialist' }, { 'title': 'Brand PR Specialist' }, { 'title': 'Financial Planning Manager' }, { 'title': 'Accounting Controller' }, { 'title': 'Corporate Paralegal' }, { 'title': 'Pediatric Specialist' }, { 'title': 'Healthcare Business Analyst' }, { 'title': 'Competitive Intelligence Analyst' }, { 'title': 'Primary Care Provider' }, { 'title': 'Digital Marketing Coordinator' }, { 'title': 'Data Quality Analyst' }, { 'title': 'Solution Architect' }, { 'title': 'Nursing Director' }, { 'title': 'Web Graphic Designer' }, { 'title': 'SEO Analyst' }, { 'title': 'Administrative Manager' }, { 'title': 'Strategic Sourcing Manager' }, { 'title': 'Supply Chain Manager' }, { 'title': 'Personal Assistant' }, { 'title': 'Classroom Teacher' }, { 'title': 'UI/UX Developer' }, { 'title': 'Social Media Manager' }, { 'title': 'Digital Marketing Analyst' }, { 'title': 'Retail Sales Associate' }, { 'title': 'Project Manager' }, { 'title': 'Finance Manager' }, { 'title': 'IT Support Specialist' }, { 'title': 'Residential Interior Designer' }, { 'title': 'Mechanical Design Engineer' }, { 'title': 'Budget Analyst' }, { 'title': 'Strategic Partnerships Manager' }, { 'title': 'Product Brand Manager' }, { 'title': 'Paralegal' }, { 'title': 'Environmental Designer' }, { 'title': 'Executive Assistant' }, { 'title': 'Trial Attorney' }, { 'title': 'Copywriter' }, { 'title': 'Front-End Developer' }, { 'title': 'Strategic Account Manager' }, { 'title': 'PCB Designer' }, { 'title': 'User Experience Designer' }, { 'title': 'Bridge Engineer' }, { 'title': 'Wealth Advisor' }, { 'title': 'Child Custody Lawyer' }, { 'title': 'Regional Sales Director' }, { 'title': 'Technical Support Specialist' }, { 'title': 'Geriatric Nurse Practitioner' }, { 'title': 'Marketing Specialist' }, { 'title': 'Market Researcher' }, { 'title': 'Family Nurse Practitioner' }, { 'title': 'Business Development Director' }, { 'title': 'Power Systems Engineer' }, { 'title': 'Digital Marketing Specialist' }, { 'title': 'Construction Project Coordinator' }, { 'title': 'Performance Tester' }, { 'title': 'Network Engineer' }, { 'title': 'UX/UI Designer' }, { 'title': 'Community Manager' }, { 'title': 'Systems Administrator' }, { 'title': 'Pediatric Physical Therapist' }, { 'title': 'Sales Advisor' }, { 'title': 'UI/UX Designer' }, { 'title': 'Water Resources Engineer' }, { 'title': 'Creative Director' }, { 'title': 'Interaction Designer' }, { 'title': 'Marketing Analytics Specialist' }, { 'title': 'Social Science Researcher' }, { 'title': 'Transportation Planner' }, { 'title': 'Inventory Manager' }, { 'title': 'Emergency Medicine Physician Assistant' }, { 'title': 'Wedding Consultant' }, { 'title': 'Mental Health Counselor' }, { 'title': 'SQL Database Developer' }, { 'title': 'Corporate Counsel' }, { 'title': 'Quality Control Engineer' }, { 'title': 'HR Generalist' }, { 'title': 'Speech Pathologist' }, { 'title': 'Recovery Coach' }, { 'title': 'Customer Support Manager' }, { 'title': 'Business Systems Analyst' }, { 'title': 'Manufacturing Engineer' }, { 'title': 'Mental Health Occupational Therapist' }, { 'title': 'Staff Nurse' }, { 'title': 'Machine Learning Engineer' }, { 'title': 'Frontend Developer' }, { 'title': 'Database Analyst' }, { 'title': 'Data Business Analyst' }, { 'title': 'Wedding Planner' }, { 'title': 'Live Chat Support Agent' }, { 'title': 'QA Manager' }, { 'title': 'Key Account Executive' }, { 'title': 'Employee Development Manager' }, { 'title': 'Technical SEO Specialist' }, { 'title': 'HR Compliance Specialist' }, { 'title': 'Business Tax Consultant' }, { 'title': 'Financial Planner' }, { 'title': 'Legal Secretary' }, { 'title': 'Electronics Hardware Engineer' }, { 'title': 'Technical SEO Analyst' }, { 'title': 'Investment Advisor' }, { 'title': 'Art Curator' }, { 'title': 'Database Security Specialist' }, { 'title': 'Data Analyst Researcher' }, { 'title': 'Small Animal Veterinarian' }, { 'title': 'Charge Nurse' }, { 'title': 'Corporate Attorney' }, { 'title': 'Email Campaign Manager' }, { 'title': 'Dental Public Health Hygienist' }, { 'title': 'Full-Stack Developer' }, { 'title': 'Content Strategist' }, { 'title': 'SEO Copywriter' }, { 'title': 'Network Security Engineer' }, { 'title': 'Senior Researcher' }, { 'title': 'Supplier Diversity Manager' }, { 'title': 'Sales Representative' }, { 'title': 'Personal Secretary' }, { 'title': 'IT Systems Administrator' }, { 'title': 'B2B Sales Consultant' }, { 'title': 'City Planner' }, { 'title': 'Outside Sales Representative' }, { 'title': 'Instructional Designer' }, { 'title': 'Software QA Tester' }, { 'title': 'Transportation Engineer' }, { 'title': 'Client Relationship Manager' }, { 'title': 'IT Project Manager' }, { 'title': 'Accounting Manager' }, { 'title': 'Systems Integration Specialist' }, { 'title': 'Visual Designer' }, { 'title': 'Investment Analyst' }, { 'title': 'Technical Product Manager' }, { 'title': 'Intellectual Property Lawyer' }, { 'title': 'Event Coordinator' }, { 'title': 'Art Education Coordinator' }, { 'title': 'CAD Technician' }, { 'title': 'Quality Assurance Analyst' }, { 'title': 'Network Support Specialist' }, { 'title': 'Lighting Designer' }, { 'title': 'Wireless Network Engineer' }, { 'title': 'Risk Analyst' }, { 'title': 'Cybersecurity Analyst' }, { 'title': 'Product Marketing Manager' }, { 'title': 'Administrative Coordinator' }, { 'title': 'Market Research Analyst' }, { 'title': 'Mobile App Developer' }, { 'title': 'Infrastructure Manager' }, { 'title': 'Data Architect' }, { 'title': 'Talent Acquisition Manager' }, { 'title': 'Cloud Architect' }, { 'title': 'Fine Arts Instructor' }, { 'title': 'Inside Sales Representative' }, { 'title': 'Java Backend Developer' }, { 'title': 'Web Designer' }, { 'title': 'Chemical Engineer' }, { 'title': 'SEO Content Strategist' }, { 'title': 'Systems Engineer' }, { 'title': 'Paid Advertising Specialist' }, { 'title': 'Customer Success Manager' }, { 'title': 'Corporate Event Planner' }, { 'title': 'Studio Art Teacher' }, { 'title': 'Office Manager' }, { 'title': 'Mergers and Acquisitions Advisor' }, { 'title': 'Event Marketing Coordinator' }, { 'title': 'Portfolio Manager' }, { 'title': 'Quality Control Manager' }, { 'title': 'Security Consultant' }, { 'title': 'Commercial Landscape Architect' }, { 'title': 'Account Strategist' }, { 'title': 'Controls Engineer' }, { 'title': 'Customer Experience Strategist' }, { 'title': 'QA Tester' }, { 'title': 'Procurement Analyst' }, { 'title': 'Help Desk Support Specialist' }, { 'title': 'Dental Hygiene Educator' }, { 'title': 'Cloud Systems Engineer' }, { 'title': 'Aircraft Design Engineer' }, { 'title': 'Advertising Account Executive' }, { 'title': 'Clinical Nurse Manager' }, { 'title': 'Avionics Engineer' }, { 'title': 'Brand Manager' }, { 'title': 'Sales Manager' }, { 'title': 'Environmental Compliance Officer' }, { 'title': 'Project Architect' }, { 'title': 'Crisis Communication Manager' }, { 'title': 'Account Executive' }, { 'title': 'System Administrator' }, { 'title': 'HVAC Engineer' }, { 'title': 'Record Keeper' }, { 'title': 'School Social Worker' }, { 'title': 'Network Security Analyst' }, { 'title': 'Backend Web Developer' }, { 'title': 'HR Coordinator' }, { 'title': 'Process Engineer' }, { 'title': 'Interior Designer' }, { 'title': 'Construction Project Manager' }, { 'title': 'Exotic Animal Veterinarian' }, { 'title': 'Onboarding Specialist' }, { 'title': 'User Interface Designer' }, { 'title': 'Surgical Physician Assistant' }, { 'title': 'Pediatric Surgeon' }, { 'title': 'Forensic Accountant' }, { 'title': 'Benefits Coordinator' }, { 'title': 'IT Analyst' }, { 'title': 'Sales Account Manager' }, { 'title': 'Test Automation Engineer' }, { 'title': 'Facilities Manager' }, { 'title': 'Sustainability Consultant' }, { 'title': 'Hospitality Interior Designer' }, { 'title': 'Content Marketing Manager' }, { 'title': 'UX Strategist' }, { 'title': 'Pediatric Occupational Therapist' }, { 'title': 'Social Media Strategist' }, { 'title': 'IT Director' }, { 'title': 'Orthopedic Physical Therapist' }, { 'title': 'Customer Support Specialist' }, { 'title': 'Legal Assistant' }]

  const suggestedLocation = [
    { 'title': 'Mbabane, Eswatini' },
    { 'title': 'Chisinau, Moldova' },
    { 'title': 'San Juan, Puerto Rico' },
    { 'title': 'Freetown, Sierra Leone' },
    { 'title': 'Noumea, New Caledonia' },
    { 'title': 'Mogadishu, Somalia' },
    { 'title': 'Zagreb, Croatia' },
    { 'title': 'Banjul, Gambia' },
    { 'title': 'Luanda, Angola' },
    { 'title': 'Torshavn, Faroe Islands' },
    { 'title': 'Moscow, Russia' },
    { 'title': 'Pristina, Kosovo' },
    { 'title': "Yamoussoukro, Cote d'Ivoire" },
    { 'title': 'Abuja, Nigeria' },
    { 'title': 'Kuala Lumpur, Malaysia' },
    { 'title': 'Podgorica, Montenegro' },
    { 'title': 'Ulaanbaatar, Mongolia' },
    { 'title': 'Douglas, Isle of Man' },
    { 'title': 'Dushanbe, Tajikistan' },
    { 'title': 'Kathmandu, Nepal' },
    { 'title': 'Port of Spain, Trinidad and Tobago' },
    { 'title': 'City of Victoria, Hong Kong SAR, China' },
    { 'title': 'Gaza, West Bank and Gaza' },
    { 'title': 'Amsterdam, Netherlands' },
    { 'title': "Saint John's, Antigua and Barbuda" },
    { 'title': 'Honiara, Solomon Islands' },
    { 'title': 'Vienna, Austria' },
    { 'title': 'Kampala, Uganda' },
    { 'title': 'Andorra la Vella, Andorra' },
    { 'title': 'Tegucigalpa, Honduras' },
    { 'title': 'Madrid, Spain' },
    { 'title': 'Basseterre, St. Kitts and Nevis' },
    { 'title': 'Vaduz, Liechtenstein' },
    { 'title': 'Pretoria, South Africa' },
    { 'title': 'Sarajevo, Bosnia and Herzegovina' },
    { 'title': 'Ngerulmud, Palau' },
    { 'title': 'Washington, D.C., USA' },
    { 'title': 'San Marino, San Marino' },
    { 'title': 'Macao, Macao SAR, China' },
    { 'title': 'Oslo, Norway' },
    { 'title': 'Kabul, Afghanistan' },
    { 'title': 'Malabo (de jure), Equatorial Guinea' },
    { 'title': 'Rabat, Morocco' },
    { 'title': 'Phnom Penh, Cambodia' },
    { 'title': 'Bridgetown, Barbados' },
    { 'title': 'Riyadh, Saudi Arabia' },
    { 'title': 'Vilnius, Lithuania' },
    { 'title': 'Apia, Samoa' },
    { 'title': 'Beijing, China' },
    { 'title': 'Dublin, Ireland' },
    { 'title': 'Brasilia, Brazil' },
    { 'title': 'Belmopan, Belize' },
    { 'title': 'Jerusalem, Israel' },
    { 'title': 'Willemstad, Curacao' },
    { 'title': 'Athens, Greece' },
    { 'title': 'Tirana, Albania' },
    { 'title': 'Bratislava, Slovak Republic' },
    { 'title': 'ReykjavÃ\xadk, Iceland' },
    { 'title': 'New Delhi, India' },
    { 'title': 'Palikir, Micronesia, Fed. Sts.' },
    { 'title': 'Conakry, Guinea' },
    { 'title': 'Lisbon, Portugal' },
    { 'title': 'Khartoum, Sudan' },
    { 'title': 'Tarawa, Kiribati' },
    { 'title': 'Gaborone, Botswana' },
    { 'title': 'Apia, American Samoa' },
    { 'title': 'Maseru, Lesotho' },
    { 'title': 'Juba, South Sudan' },
    { 'title': 'Marigot, St. Martin (French part)' },
    { 'title': 'Beirut, Lebanon' },
    { 'title': 'Philipsburg, Sint Maarten (Dutch part)' },
    { 'title': 'Hagatna, Guam' },
    { 'title': 'The City of Hamilton, Bermuda' },
    { 'title': 'Port Vila, Vanuatu' },
    { 'title': 'Dakar, Senegal' },
    { 'title': 'Addis Ababa, Ethiopia' },
    { 'title': 'Ouagadougou, Burkina Faso' },
    { 'title': 'Road Town, British Virgin Islands' },
    { 'title': 'Prague, Czech Republic' },
    { 'title': 'Rome, Italy' },
    { 'title': 'Cairo, Egypt' },
    { 'title': 'San Salvador, El Salvador' },
    { 'title': 'Bangui, Central African Republic' },
    { 'title': 'Lusaka, Zambia' },
    { 'title': 'Canberra, Australia' },
    { 'title': 'Ljubljana, Slovenia' },
    { 'title': 'Bamako, Mali' },
    { 'title': 'Luxembourg, Luxembourg' },
    { 'title': 'Damascus, Syrian Arab Republic' },
    { 'title': 'Panama City, Panama' },
    { 'title': 'Valletta, Malta' },
    { 'title': 'Tripoli, Libya' },
    { 'title': 'Antananarivo, Madagascar' },
    { 'title': 'SÃ£o TomÃ©, Sao Tome and Principe' },
    { 'title': 'Bandar Seri Begawan, Brunei' },
    { 'title': 'Guatemala City, Guatemala' },
    { 'title': 'Bucharest, Romania' },
    { 'title': 'Brazzaville, Republic Of Congo' },
    { 'title': 'Ottawa, Canada' },
    { 'title': 'AsunciÃ³n, Paraguay' },
    { 'title': 'Tbilisi, Georgia' },
    { 'title': 'Castries, St. Lucia' },
    { 'title': 'Roseau, Dominica' },
    { 'title': 'Montevideo, Uruguay' },
    { 'title': 'Porto-Novo, Benin' },
    { 'title': 'Ashgabat, Turkmenistan' },
    { 'title': 'Belgrade, Serbia' },
    { 'title': 'Havana, Cuba' },
    { 'title': 'Tehran, Iran, Islamic Rep.' },
    { 'title': 'Accra, Ghana' },
    { 'title': 'Nassau, Bahamas, The' },
    { 'title': 'Naypyidaw, Myanmar' },
    { 'title': "Saint George's, Grenada" },
    { 'title': 'Bangkok, Thailand' },
    { 'title': 'Yaren District (de facto), Nauru' },
    { 'title': 'Seoul, Korea, Rep.' },
    { 'title': 'Jakarta, Indonesia' },
    { 'title': 'Warsaw, Poland' },
    { 'title': 'Gitega, Burundi' },
    { 'title': 'Dili, Timor-Leste' },
    { 'title': 'George Town, Cayman Islands' },
    { 'title': 'Dhaka, Bangladesh' },
    { 'title': 'Copenhagen, Denmark' },
    { 'title': 'Sucre (de jure), Bolivia' },
    { 'title': 'Maputo, Mozambique' },
    { 'title': 'Lima, Peru' },
    { 'title': 'Singapore, Singapore' },
    { 'title': 'BogotÃ¡, Colombia' },
    { 'title': 'Suva, Fiji' },
    { 'title': 'London, UK' },
    { 'title': 'Berlin, Germany' },
    { 'title': 'Kigali, Rwanda' },
    { 'title': 'Port Moresby, Papua New Guinea' },
    { 'title': 'Caracas, Venezuela, RB' },
    { 'title': 'Managua, Nicaragua' },
    { 'title': 'Kyiv (also known as Kiev), Ukraine' },
    { 'title': 'Nur-Sultan, Kazakhstan' },
    { 'title': "N'Djamena, Chad" },
    { 'title': 'Yaounde, Cameroon' },
    { 'title': 'Santo Domingo, Dominican Republic' },
    { 'title': 'Sri Jayawardenepura Kotte, Sri Lanka' },
    { 'title': 'Oranjestad, Aruba' },
    { 'title': 'Santiago, Chile' },
    { 'title': 'LomÃ©, Togo' },
    { 'title': 'Islamabad, Pakistan' },
    { 'title': 'Tunis, Tunisia' },
    { 'title': 'Georgetown, Guyana' },
    { 'title': 'Ankara, Turkey' },
    { 'title': 'Windhoek, Namibia' },
    { 'title': 'Victoria, Seychelles' },
    { 'title': 'Nicosia, Cyprus' },
    { 'title': 'Cockburn Town, Turks and Caicos Islands' },
    { 'title': 'Gibraltar, Gibraltar' },
    { 'title': 'Libreville, Gabon' },
    { 'title': 'Yerevan, Armenia' },
    { 'title': 'Moroni, Comoros' },
    { 'title': 'San Jose, Costa Rica' },
    { 'title': 'Skopje, Macedonia, FYR' },
    { 'title': 'Majuro, Marshall Islands' },
    { 'title': 'Sofia, Bulgaria' },
    { 'title': 'City of Baghdad, Iraq' },
    { 'title': 'Funafuti, Tuvalu' },
    { 'title': 'Nuku?alofa, Tonga' },
    { 'title': 'Lilongwe, Malawi' },
    { 'title': 'City of Port Louis, Mauritius' },
    { 'title': 'Brussels, Belgium' },
    { 'title': 'Tallinn, Estonia' },
    { 'title': 'Harare, Zimbabwe' },
    { 'title': 'Helsinki, Finland' },
    { 'title': 'Bern, Switzerland' },
    { 'title': 'Abu Dhabi, UAE' },
    { 'title': 'Nouakchott, Mauritania' },
    { 'title': 'Hanoi, Vietnam' },
    { 'title': 'Kingstown, St. Vincent and the Grenadines' },
    { 'title': 'Stockholm, Sweden' },
    { 'title': 'Algiers, Algeria' },
    { 'title': 'Paramaribo, Suriname' },
    { 'title': 'Paris, France' },
    { 'title': 'Quito, Ecuador' },
    { 'title': 'Doha, Qatar' },
    { 'title': 'Kingston, Jamaica' },
    { 'title': 'Nuuk, Greenland' },
    { 'title': 'Bissau, Guinea-Bissau' },
    { 'title': 'Tashkent, Uzbekistan' },
    { 'title': 'Wellington, New Zealand' },
    { 'title': 'Asmara, Eritrea' },
    { 'title': 'Manama, Bahrain' },
    { 'title': 'Monaco, Monaco' },
    { 'title': 'Minsk, Belarus' },
    { 'title': 'Thimphu, Bhutan' },
    { 'title': 'Muscat, Oman' },
    { 'title': 'Male, Maldives' },
    { 'title': 'Djibouti (city), Djibouti' },
    { 'title': 'Port-au-Prince, Haiti' },
    { 'title': 'Budapest, Hungary' },
    { 'title': 'Tokyo, Japan' },
    { 'title': 'Sanaa, Yemen' },
    { 'title': 'Kinshasa, Democratic Republic Of Congo' },
    { 'title': 'Niamey, Niger' },
    { 'title': 'Riga, Latvia' },
    { 'title': 'Praia, Cabo Verde' },
    { 'title': 'Kuwait City, Kuwait' },
    { 'title': 'Capitol Hill, Saipan, Northern Mariana Islands' },
    { 'title': 'Nairobi, Kenya' },
    { 'title': 'Mexico City, Mexico' },
    { 'title': 'Dodoma, Tanzania' },
    { 'title': 'Vientiane, Lao PDR' },
    { 'title': 'Charlotte Amalie, Virgin Islands (U.S.)' },
    { 'title': 'Bishkek, Kyrgyz Republic' },
    { 'title': 'Seoul, North Korea' },
    { 'title': 'Baku, Azerbaijan' },
    { 'title': 'Monrovia, Liberia' },
    { 'title': 'Manila, Philippines' },
    { 'title': 'Papeete, French Polynesia' },
    { 'title': 'Buenos Aires, Argentina' },
    { 'title': 'Amman, Jordan' }]


  const suggestedSkills = [
    { "title": "Business development" },
    { "title": "Sales strategy" },
    { "title": "Market analysis" },
    { "title": "Client acquisition" },
    { "title": "Team leadership" },
    { "title": "Strategic planning" },
    { "title": "Presentation skills" },
    { "title": "Data collection and analysis" },
    { "title": "Market research tools and techniques" },
    { "title": "Survey design and analysis" },
    { "title": "Qualitative and quantitative research methods" },
    { "title": "Report writing and presentation skills" },
    { "title": "Brand strategy development" },
    { "title": "Brand identity and design" },
    { "title": "Brand storytelling" },
    { "title": "Marketing campaigns" },
    { "title": "Brand performance measurement" },
    { "title": "Creative thinking" },
    { "title": "Strong communication skills" },
    { "title": "Special education strategies" },
    { "title": "Individualized education plans (IEPs)" },
    { "title": "Behavior management techniques" },
    { "title": "Collaboration with support staff" },
    { "title": "Special education laws and regulations knowledge" },
    { "title": "Operations management" },
    { "title": "Budgeting and financial analysis" },
    { "title": "Leadership and team management" },
    { "title": "Process improvement and optimization" },
    { "title": "Email marketing strategies" },
    { "title": "Email marketing platforms (e.g., MailChimp, HubSpot)" },
    { "title": "Audience segmentation" },
    { "title": "A/B testing" },
    { "title": "Campaign analytics" },
    { "title": "Copywriting" },
    { "title": "HTML/CSS for email" },
    { "title": "Marketing automation" },
    { "title": "Quality control processes and methodologies" },
    { "title": "Statistical process control (SPC)" },
    { "title": "Root cause analysis and corrective action" },
    { "title": "Quality management systems (e.g., ISO 9001)" },
    { "title": "Compliance and regulatory knowledge" },
    { "title": "Emergency medical care" },
    { "title": "Triage and assessment" },
    { "title": "Trauma management" },
    { "title": "Data analysis" },
    { "title": "Database querying and reporting" },
    { "title": "Data visualization" },
    { "title": "SQL proficiency" },
    { "title": "Data quality assurance" },
    { "title": "Construction management" },
    { "title": "Budgeting" },
    { "title": "Contract negotiation" },
    { "title": "Safety regulations" },
    { "title": "User-centered design principles" },
    { "title": "UX/UI design tools (e.g., Sketch, Adobe XD)" },
    { "title": "Wireframing and prototyping" },
    { "title": "Usability testing and user research" },
    { "title": "Information architecture and user flows" },
    { "title": "Frontend development" },
    { "title": "HTML, CSS, and JavaScript" },
    { "title": "Responsive web design" },
    { "title": "Cross-browser compatibility" },
    { "title": "Version control (e.g., Git)" },
    { "title": "Brand management" },
    { "title": "Public relations" },
    { "title": "Influencer marketing" },
    { "title": "Media monitoring" },
    { "title": "Social media platforms (e.g., Facebook, Twitter, Instagram)" },
    { "title": "Content creation and scheduling" },
    { "title": "Social media analytics and insights" },
    { "title": "Community engagement" },
    { "title": "Paid social advertising" },
    { "title": "Google Ads management" },
    { "title": "PPC campaign optimization" },
    { "title": "Keyword research" },
    { "title": "Ad copywriting" },
    { "title": "Conversion tracking" },
    { "title": "Customer support" },
    { "title": "System administration" },
    { "title": "Server maintenance" },
    { "title": "Active Directory" },
    { "title": "Backup and recovery" },
    { "title": "Cloud computing (e.g., AWS, Azure)" },
    { "title": "Troubleshooting" },
    { "title": "IT security best practices" },
    { "title": "Market research methodologies" },
    { "title": "Construction project management" },
    { "title": "Building codes and regulations knowledge" },
    { "title": "Digital marketing strategies" },
    { "title": "Pediatric rehabilitation" },
    { "title": "Google Ads management" },
    { "title": "Supply chain logistics" },
    { "title": "Account management" },
    { "title": "Quality assurance" },
    { "title": "Project management" },
    { "title": "User interface (UI) design" },
    { "title": "Data analysis" },
    { "title": "Medical product knowledge" },
    { "title": "Enterprise architecture" },
    { "title": "Equine veterinary medicine" },
    { "title": "Event planning and management" },
    { "title": "Print design software (e.g., Adobe InDesign, Illustrator)" },
    { "title": "Sales strategy and planning" },
    { "title": "Frontend and backend development" },
    { "title": "Industrial engineering" },
    { "title": "Supplier diversity programs" },
    { "title": "Accounting" },
    { "title": "Art education curriculum" },
    { "title": "Onboarding process management" },
    { "title": "Clinical nursing specialization (e.g., critical care, oncology)" },
    { "title": "Solution design" },
    { "title": "Talent sourcing" },
    { "title": "Risk assessment" },
    { "title": "Electrical engineering" },
    { "title": "Art history and knowledge" },
    { "title": "Legal research" },
    { "title": "Data architecture design" },
    { "title": "Database security measures" },
    { "title": "Technical troubleshooting" },
    { "title": "Machine learning algorithms" },
    { "title": "Customer relationship management" },
    { "title": "Pediatrics" },
    { "title": "Financial planning" },
    { "title": "Usability evaluation" },
    { "title": "Tax preparation" },
    { "title": "Bridge design" },
    { "title": "Employee benefits administration" },
    { "title": "Media relations" },
    { "title": "Product positioning and messaging" },
    { "title": "Performance testing methodologies" },
    { "title": "Corporate law" },
    { "title": "Customer experience strategy" },
    { "title": "Technical writing" },
    { "title": "Landscape design" },
    { "title": "Orthopedic assessment and treatment" },
    { "title": "Partnership development" },
    { "title": "Digital marketing strategy development" },
    { "title": "Mobile app development languages" },
    { "title": "Content strategy" },
    { "title": "Quality assurance processes" },
    { "title": "Technical SEO" },
    { "title": "Customer service" },
    { "title": "Inventory control" },
    { "title": "Clinical psychology" },
    { "title": "Network security protocols and technologies" },
    { "title": "HR policies and procedures" },
    { "title": "Financial analysis" },
    { "title": "Solution design" },
    { "title": "Art instruction" },
    { "title": "Wedding planning" }
  ];




  // const handleInputChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   fetchData(query);
  // };




  const handleJobInputChange = (e) => {
    console.log(e);
    setSelectedJobs(e.target.value)
    // fetchData();
  };




  const handleLocationInputChange = (e) => {
    console.log(e);

    setSelectedLocation(e.target.value);

    // fetchData();
  };




  const handleSkillInputChange = (selectedSkills) => {
    setSelectedSkill(selectedSkills);
    // fetchData();
  };




  const handleSalaryRangeChange = (newValue) => {
    console.log("filter by salary range")

    setSalaryRange(newValue);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
    // toggleFormVisibility();
    // setIsExpanded(false);
  };




  return (
    <>
      {/* <div className="form-group">
       <input
         type="text"
         placeholder="Search for a job title, company or skills"
         id="filter-text-val"
         value={searchQuery}
         onChange={handleInputChange}
       />
     </div> */}




      <div className="form-filters justify-content-center px-3">
        {/* <button class="btn dropdown-toggle" onClick={toggleFormVisibility}>
         {isExpanded ? "Filter By" : "Filter By"}
       </button> */}
        {/* {isExpanded && */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedJobs} dropdown_type={"Job Titles"} setSelectedItem={setSelectedJobs} onChange={handleJobInputChange} />
          </div>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedLocation} dropdown_type={"Locations"} setSelectedItem={setSelectedLocation} onChange={handleLocationInputChange} />
          </div>
          <div className="form-group">
            <MultiSelect dropdown_items={suggestedSkills} dropdown_type={"Skills"} setSelectedItem={setSelectedSkill} onChange={handleSkillInputChange} />
          </div>
          <div className="form-group">
            <p id="salaryrange-p">Select Salary Range:</p>
            <SortSlider value={salaryRange} onChange={handleSalaryRangeChange} />
          </div>




          <Button className='mx-auto' onClick={handleSubmit} variant='outline-info'>Apply Filters</Button>






        </form>
      </div >
    </>
  )
};




export default ExpandedSearchForm;


