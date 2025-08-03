import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function extractField(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const contentStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, contentStart);
  
  if (endIndex === -1) return text.slice(contentStart).trim();
  return text.slice(contentStart, endIndex).trim();
}

async function generateProfile() {
  try {
    // Read from PDF in public directory
    const pdfPath = join(process.cwd(), 'public', 'profile.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    console.log('Extracted text from PDF:', text); // Debug log

    // Create profile object
    const profile = {
      name: extractField(text, 'Name:', '\n') || "Prashant Nagpal",
      title: extractField(text, 'Title:', '\n') || "Head of Finance",
      tagline: extractField(text, 'Tagline:', '\n') || "Experienced finance leader with expertise in financial strategy",
      about: {
        overview: [extractField(text, 'Overview:', '\n')].filter(Boolean),
        specialties: extractField(text, 'Specialties:', '\n')?.split(',').map(s => s.trim()) || [],
        philosophy: extractField(text, 'Philosophy:', '\n') || ""
      },
      education: [
        {
          degree: extractField(text, 'Degree:', '\n') || "MBA, Finance",
          institution: extractField(text, 'Institution:', '\n') || "INSEAD Business School",
          year: extractField(text, 'Year:', '\n') || "2014",
          description: extractField(text, 'Description:', '\n') || ""
        }
      ],
      certifications: [
        {
          name: extractField(text, 'Certification:', '\n') || "Chartered Financial Analyst (CFA)",
          institution: extractField(text, 'Cert Institution:', '\n') || "CFA Institute",
          year: extractField(text, 'Cert Year:', '\n') || "2016"
        }
      ],
      skills: [
        {
          category: "Financial Management",
          items: [
            { name: "Financial Strategy", level: 95 },
            { name: "Budgeting & Forecasting", level: 90 }
          ]
        }
      ],
      experience: [
        {
          id: "current",
          company: extractField(text, 'Company:', '\n') || "GetYourGuide",
          position: extractField(text, 'Position:', '\n') || "Head of Finance",
          location: extractField(text, 'Location:', '\n') || "Berlin, Germany",
          period: extractField(text, 'Period:', '\n') || "Jan 2021 - Present",
          description: [extractField(text, 'Experience:', '\n')].filter(Boolean)
        }
      ],
      contact: {
        linkedin: extractField(text, 'LinkedIn:', '\n') || "https://www.linkedin.com/in/nagpal-p/",
        phone: extractField(text, 'Phone:', '\n') || "+49 1XX XXX XXXX",
        location: extractField(text, 'Location:', '\n') || "Berlin, Germany"
      }
    };

    // Generate the profile.ts content
    const profileContent = `import { Profile } from '@/types/profile';

export const profileData: Profile = ${JSON.stringify(profile, null, 2)};
`;

    // Write to profile.ts
    const outputPath = join(process.cwd(), 'src', 'data', 'profile.ts');
    fs.writeFileSync(outputPath, profileContent);

    console.log('Profile data successfully generated from PDF!');
  } catch (error) {
    console.error('Error generating profile:', error);
  }
}

generateProfile(); 