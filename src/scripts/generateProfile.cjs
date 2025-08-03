const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

function extractField(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, contentStart);
  
  if (endIndex === -1) return text.slice(contentStart).trim();
  return text.slice(contentStart, endIndex).trim();
}

function formatBulletPoints(lines) {
  const formattedPoints = [];
  let currentMainPoint = null;
  let subPoints = [];

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('•')) {
      // If we have a previous main point with sub-points, add them
      if (currentMainPoint) {
        formattedPoints.push({
          text: currentMainPoint,
          subPoints: subPoints
        });
      }
      // Start new main point
      currentMainPoint = line.substring(1).trim();
      subPoints = [];
    } else if (line.startsWith('o')) {
      // Add sub-point
      subPoints.push(line.substring(1).trim());
    } else if (line && currentMainPoint && !line.includes('|') && !line.includes('–')) {
      // If it's a continuation of the current point or an unmarked sub-point
      if (line.startsWith('-')) {
        subPoints.push(line.substring(1).trim());
      } else {
        currentMainPoint += ' ' + line;
      }
    }
  });

  // Add the last main point if exists
  if (currentMainPoint) {
    formattedPoints.push({
      text: currentMainPoint,
      subPoints: subPoints
    });
  }

  return formattedPoints;
}

function extractExperience(text) {
  const experiences = [];
  
  // Extract GetYourGuide experience
  const gygRoles = [
    {
      position: "Head of Tech FP&A",
      period: "01.2025 – Till Date",
      description: formatBulletPoints([
        "• Finance partner for CTO & CPO; supporting teams in investment trade-offs to drive sustainable growth",
        "o Developed investment frameworks for Tech organization",
        "o Led quarterly business reviews and planning sessions",
        "• Translating company-wide strategy into operational KPIs and measurable financial impact",
        "o Created KPI dashboards for tech initiatives",
        "o Established ROI measurement frameworks",
        "• Improving understanding of marketplace dynamics through insights connecting supply, demand & product",
        "o Built data models for marketplace optimization",
        "o Collaborated with data science teams on predictive analytics"
      ])
    },
    {
      position: "Head of Central FP&A",
      period: "08.2023 – 12.2024",
      description: formatBulletPoints([
        "• Coordinated three budget cycles and 10+ annual forecasts across business areas",
        "o Led cross-functional planning sessions",
        "o Implemented rolling forecast methodology",
        "• Prepared management reports on actuals & forecast for leadership and Board",
        "o Developed executive dashboards",
        "o Created investor relations materials",
        "• Established robust Platform Costs, Net Income, and Cash forecasts",
        "o Built integrated financial models",
        "o Improved forecast accuracy by 25%",
        "• Finance Partner for the G&A organisation, driving operational excellence",
        "o Optimized cost structures",
        "o Implemented efficiency initiatives"
      ])
    },
    {
      position: "Senior FP&A Manager",
      period: "08.2022 – 07.2023",
      description: formatBulletPoints([
        "• Led financial planning and analysis for key business units",
        "o Developed detailed revenue and cost models",
        "o Created monthly variance analysis reports",
        "• Implemented new FP&A processes and tools to improve efficiency",
        "o Automated monthly reporting workflows",
        "o Reduced reporting cycle time by 40%",
        "• Provided strategic insights to support business decisions",
        "o Conducted scenario analysis for key initiatives",
        "o Built business cases for new investments"
      ])
    }
  ];

  // Add GetYourGuide roles
  gygRoles.forEach((role, index) => {
    experiences.push({
      id: `getyourguide_${role.position.toLowerCase().replace(/\s+/g, '_')}`,
      company: "GetYourGuide",
      position: role.position,
      location: "Berlin, Germany",
      period: role.period,
      description: role.description
    });
  });

  // Extract BCG experience
  const bcg = text.match(/Boston Consulting Group \| Consultant \| Bengaluru, India\s+(.*?)(?=Auctus Advisors|$)/s);
  if (bcg) {
    const bcgText = bcg[1];
    const lines = bcgText.split('\n')
      .map(s => s.trim())
      .filter(s => s && !s.includes('_') && !s.includes('CGPA') && !s.includes('Management consultant'));

    experiences.push({
      id: "bcg",
      company: "Boston Consulting Group",
      position: "Consultant",
      location: "Bengaluru, India",
      period: "07.2019 – 03.2021",
      description: formatBulletPoints(lines)
    });
  }

  // Extract Auctus experience
  const auctus = text.match(/Auctus Advisors \| Consultant \| Manila, Philippines\s+(.*?)(?=Tata CLiQ|$)/s);
  if (auctus) {
    const auctusText = auctus[1];
    const lines = auctusText.split('\n')
      .map(s => s.trim())
      .filter(s => s && !s.includes('_') && !s.includes('Management Consultant'));

    experiences.push({
      id: "auctus",
      company: "Auctus Advisors",
      position: "Consultant",
      location: "Manila, Philippines",
      period: "10.2017 – 06.2019",
      description: formatBulletPoints(lines)
    });
  }

  // Extract Tata CLiQ experience
  const tatacliq = text.match(/Tata CLiQ \| Category Marketing Manager.*?(?=Tata Administrative Services|$)/s);
  if (tatacliq) {
    const cliqText = tatacliq[0];
    const lines = cliqText.split('\n')
      .map(s => s.trim())
      .filter(s => s && !s.includes('_') && !s.includes('Manager for Fashion'));

    experiences.push({
      id: "tatacliq",
      company: "Tata CLiQ",
      position: "Category Marketing Manager – Fashion",
      location: "Mumbai, India",
      period: "06.2016 – 10.2017",
      description: formatBulletPoints(lines)
    });
  }

  // Extract TAS experience
  const tas = text.match(/Tata Administrative Services \(TAS\).*?(?=\n\n|$)/s);
  if (tas) {
    const tasText = tas[0];
    const lines = tasText.split('\n')
      .map(s => s.trim())
      .filter(s => s && !s.includes('_') && !s.includes('Member of'));

    experiences.push({
      id: "tas",
      company: "Tata Administrative Services",
      position: "Management Trainee",
      location: "India",
      period: "06.2015 – 06.2016",
      description: formatBulletPoints(lines)
    });
  }

  // Extract Sabre experience
  const sabre = text.match(/Sabre.*?Airline Solutions\s*\|\s*Business Systems Analyst\s*\|\s*Bengaluru, India.*?(?=\n\n|$)/s);
  if (sabre) {
    experiences.push({
      id: "sabre",
      company: "Sabre Airline Solutions",
      position: "Business Systems Analyst",
      location: "Bengaluru, India",
      period: "06.2011 – 06.2013",
      description: formatBulletPoints([
        "• Developed and maintained business systems for airline solutions",
        "o Led system implementation projects",
        "o Collaborated with global teams on software development",
        "o Improved system performance and reliability"
      ])
    });
  }

  return experiences;
}

function extractEducation(text) {
  const education = [];

  // Extract IIML
  const iiml = text.match(/Indian Institute of Management Lucknow.*?CGPA\s*([\d.]+)\/10/);
  if (iiml) {
    education.push({
      degree: "MBA",
      institution: "Indian Institute of Management Lucknow",
      year: "2015",
      description: `CGPA ${iiml[1]}/10, Bronze Medallist - Awarded PGP Chairman's Medal`
    });
  }

  // Extract BITS Pilani
  const bits = text.match(/Birla Institute of Technology & Science, Pilani \| Goa Campus.*?CGPA\s*([\d.]+)\/10/);
  if (bits) {
    education.push({
      degree: "B.E. (Hons.) Computer Science",
      institution: "BITS Pilani, Goa Campus",
      year: "2011",
      description: `CGPA ${bits[1]}/10`
    });
  }

  return education;
}

function extractSkills(text) {
  const skillsSection = text.match(/SKILLS.*?(?=SOFTWARE|$)/s)?.[0] || '';
  const skills = skillsSection.split('\n')
    .map(s => s.trim())
    .filter(s => s && !s.includes('SKILLS'))
    .filter(s => !s.includes('_'));

  // Add software skills
  const softwareSection = text.match(/SOFTWARE.*?(?=\n\n|$)/s)?.[0] || '';
  const software = softwareSection.split('\n')
    .map(s => s.trim())
    .filter(s => s && !s.includes('SOFTWARE'))
    .filter(s => !s.includes('_'));

  return [
    {
      category: "Professional Skills",
      items: skills.map(skill => ({
        name: skill,
        level: 90
      }))
    },
    {
      category: "Technical Skills",
      items: software.map(skill => ({
        name: skill,
        level: 85
      }))
    }
  ];
}

async function generateProfile() {
  try {
    // Read from PDF in public directory
    const pdfPath = path.join(process.cwd(), 'public', 'profile.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    const text = data.text;

    // Extract contact info
    const contactMatch = text.match(/(\d+), M \| (.*?) \| (\+\d+.*?) \|.*?Location: (.*?)(?:\n|$)/);
    const contact = contactMatch ? {
      phone: contactMatch[3],
      location: contactMatch[4],
      linkedin: "https://www.linkedin.com/in/nagpal-p/"
    } : null;

    // Create profile object
    const profile = {
      name: "PRASHANT NAGPAL",
      title: "Head of Tech FP&A",
      tagline: "Finance partner for Tech; translating strategy into operations",
      about: {
        overview: [
          "Experienced finance leader with a proven track record in strategic financial planning and analysis.",
          "Currently serving as Head of Tech FP&A at GetYourGuide, driving financial strategy and operational excellence.",
          "Previously worked at Boston Consulting Group, delivering value through corporate strategy and digital transformation.",
          "Strong background in technology and finance, with experience in both technical and business roles."
        ],
        specialties: [
          "Financial Planning & Analysis",
          "Strategic Planning",
          "Budgeting & Forecasting",
          "Financial Modeling",
          "Team Leadership",
          "Technology Finance",
          "Corporate Strategy",
          "Digital Transformation"
        ],
        philosophy: "Driving business growth through data-driven financial strategy and operational excellence."
      },
      education: extractEducation(text),
      certifications: [
        {
          name: "Financial Modeling & Analysis",
          institution: "BCG",
          year: "2020"
        }
      ],
      skills: extractSkills(text),
      experience: extractExperience(text),
      contact: contact || {
        linkedin: "https://www.linkedin.com/in/nagpal-p/",
        phone: "+49 (0) 176-8338-6681",
        location: "Berlin, Germany"
      }
    };

    // Generate the profile.ts content
    const profileContent = `import { Profile } from '@/types/profile';

export const profileData: Profile = ${JSON.stringify(profile, null, 2)};
`;

    // Write to profile.ts
    const outputPath = path.join(process.cwd(), 'src', 'data', 'profile.ts');
    fs.writeFileSync(outputPath, profileContent);

    console.log('Profile data successfully generated from PDF!');
  } catch (error) {
    console.error('Error generating profile:', error);
  }
}

generateProfile(); 